#!/usr/bin/env bash
# Creates (once) a CloudFront distribution in front of the static S3 bucket,
# wires Origin Access Control, bucket policy, SPA error pages, and your ACM cert.
#
# Prerequisites: aws CLI v2, jq, credentials for the account that owns the bucket.
#
# Required:
#   export ACM_CERTIFICATE_ARN='arn:aws:acm:us-east-1:ACCOUNT:certificate/UUID'
# Optional (defaults match this repo's deploy target):
#   S3_BUCKET=sports-results-578273199980-eu-west-3-an
#   S3_BUCKET_REGION=eu-west-3
#   CLOUDFRONT_DOMAIN=sports.dealvault.fr
#
# Certificate must be in us-east-1 (CloudFront requirement), even if the bucket is in eu-west-3.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_FILE="${ROOT_DIR}/scripts/.cloudfront-state.json"

S3_BUCKET="${S3_BUCKET:-sports-results-578273199980-eu-west-3-an}"
S3_BUCKET_REGION="${S3_BUCKET_REGION:-eu-west-3}"
CLOUDFRONT_DOMAIN="${CLOUDFRONT_DOMAIN:-sports.dealvault.fr}"
ACM_CERTIFICATE_ARN="${ACM_CERTIFICATE_ARN:?Set ACM_CERTIFICATE_ARN (ACM cert in us-east-1, e.g. arn:aws:acm:us-east-1:...)}"

OAC_NAME="sport-results-oac-${S3_BUCKET}"
ORIGIN_ID="s3-${S3_BUCKET}"
ORIGIN_DOMAIN="${S3_BUCKET}.s3.${S3_BUCKET_REGION}.amazonaws.com"
# Managed-CachingOptimized
CACHE_POLICY_ID="658327ea-f89d-4fab-a63d-7e88639e58f6"

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1" >&2
    exit 1
  }
}

need_cmd aws
need_cmd jq

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"

if [[ -f "$STATE_FILE" ]]; then
  DIST_ID="$(jq -r '.distributionId // empty' "$STATE_FILE")"
  if [[ -n "$DIST_ID" ]]; then
    DOMAIN_NAME="$(aws cloudfront get-distribution --id "$DIST_ID" --query 'Distribution.DomainName' --output text 2>/dev/null || true)"
    echo "State file already has distributionId=$DIST_ID"
    if [[ -n "$DOMAIN_NAME" && "$DOMAIN_NAME" != "None" ]]; then
      echo "CloudFront domain: $DOMAIN_NAME"
      echo "Point DNS (CNAME or ALIAS) for ${CLOUDFRONT_DOMAIN} → ${DOMAIN_NAME}"
    fi
    echo "To create a new distribution, remove ${STATE_FILE} first (and delete or repoint the old distribution in AWS)."
    exit 0
  fi
fi

echo "Using bucket ${S3_BUCKET} (${S3_BUCKET_REGION}), domain ${CLOUDFRONT_DOMAIN}"

OAC_ID="$(
  aws cloudfront list-origin-access-controls \
    --query "OriginAccessControlList.Items[?Name=='${OAC_NAME}'].Id | [0]" \
    --output text
)"
if [[ -z "$OAC_ID" || "$OAC_ID" == "None" ]]; then
  OAC_CFG="$(mktemp)"
  jq -n \
    --arg name "$OAC_NAME" \
    --arg desc "OAC for ${S3_BUCKET}" \
    '{
      Name: $name,
      Description: $desc,
      SigningProtocol: "sigv4",
      SigningBehavior: "always",
      OriginAccessControlOriginType: "s3"
    }' >"$OAC_CFG"
  OAC_ID="$(
    aws cloudfront create-origin-access-control \
      --origin-access-control-config "file://${OAC_CFG}" \
      --query OriginAccessControl.Id \
      --output text
  )"
  rm -f "$OAC_CFG"
  echo "Created Origin Access Control: $OAC_ID"
else
  echo "Reusing Origin Access Control: $OAC_ID"
fi

CALLER_REF="sport-results-$(date +%s)-$$"

DIST_CONFIG="$(
  jq -cn \
    --arg ref "$CALLER_REF" \
    --arg domain "$CLOUDFRONT_DOMAIN" \
    --arg origin_id "$ORIGIN_ID" \
    --arg origin_domain "$ORIGIN_DOMAIN" \
    --arg oac_id "$OAC_ID" \
    --arg cert "$ACM_CERTIFICATE_ARN" \
    --arg cache_policy "$CACHE_POLICY_ID" \
    '{
      CallerReference: $ref,
      Aliases: { Quantity: 1, Items: [$domain] },
      DefaultRootObject: "index.html",
      Origins: {
        Quantity: 1,
        Items: [
          {
            Id: $origin_id,
            DomainName: $origin_domain,
            OriginPath: "",
            CustomHeaders: { Quantity: 0 },
            S3OriginConfig: { OriginAccessIdentity: "" },
            ConnectionAttempts: 3,
            ConnectionTimeout: 10,
            OriginShield: { Enabled: false },
            OriginAccessControlId: $oac_id
          }
        ]
      },
      OriginGroups: { Quantity: 0 },
      DefaultCacheBehavior: {
        TargetOriginId: $origin_id,
        TrustedSigners: { Enabled: false, Quantity: 0 },
        TrustedKeyGroups: { Enabled: false, Quantity: 0 },
        ViewerProtocolPolicy: "redirect-to-https",
        AllowedMethods: {
          Quantity: 2,
          Items: ["GET", "HEAD"],
          CachedMethods: { Quantity: 2, Items: ["GET", "HEAD"] }
        },
        SmoothStreaming: false,
        Compress: true,
        LambdaFunctionAssociations: { Quantity: 0 },
        FunctionAssociations: { Quantity: 0 },
        FieldLevelEncryptionId: "",
        CachePolicyId: $cache_policy
      },
      CacheBehaviors: { Quantity: 0 },
      CustomErrorResponses: {
        Quantity: 2,
        Items: [
          { ErrorCode: 403, ResponsePagePath: "/index.html", ResponseCode: "200", ErrorCachingMinTTL: 0 },
          { ErrorCode: 404, ResponsePagePath: "/index.html", ResponseCode: "200", ErrorCachingMinTTL: 0 }
        ]
      },
      Comment: "sport-results static site",
      Logging: { Enabled: false, IncludeCookies: false, Bucket: "", Prefix: "" },
      PriceClass: "PriceClass_100",
      Enabled: true,
      ViewerCertificate: {
        CloudFrontDefaultCertificate: false,
        ACMCertificateArn: $cert,
        SSLSupportMethod: "sni-only",
        MinimumProtocolVersion: "TLSv1.2_2021",
        CertificateSource: "acm"
      },
      Restrictions: { GeoRestriction: { RestrictionType: "none", Quantity: 0 } },
      WebACLId: "",
      HttpVersion: "http2and3",
      IsIPV6Enabled: true,
      Staging: false
    }'
)"

TMP="$(mktemp)"
printf '%s\n' "{\"DistributionConfig\":${DIST_CONFIG}}" >"$TMP"

DIST_ID="$(
  aws cloudfront create-distribution --cli-input-json "file://${TMP}" --query 'Distribution.Id' --output text
)"
rm -f "$TMP"

echo "Created CloudFront distribution: $DIST_ID (deployment takes ~5–15 minutes)"

DIST_ARN="arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DIST_ID}"

POLICY_STATEMENT=$(
  jq -n \
    --arg bucket "$S3_BUCKET" \
    --arg arn "$DIST_ARN" \
    '{
      Sid: "AllowCloudFrontServicePrincipalSportResults",
      Effect: "Allow",
      Principal: { Service: "cloudfront.amazonaws.com" },
      Action: "s3:GetObject",
      Resource: ("arn:aws:s3:::" + $bucket + "/*"),
      Condition: { StringEquals: { "AWS:SourceArn": $arn } }
    }'
)

if aws s3api get-bucket-policy --bucket "$S3_BUCKET" &>/dev/null; then
  EXISTING="$(aws s3api get-bucket-policy --bucket "$S3_BUCKET" --query Policy --output text | jq -r '.' )"
  MERGED="$(
    echo "$EXISTING" | jq --argjson stmt "$POLICY_STATEMENT" '
      .Statement = (
        (.Statement // []) | if type == "array" then . else [.] end
        | map(select(.Sid != "AllowCloudFrontServicePrincipalSportResults"))
        + [$stmt]
      )
    '
  )"
else
  MERGED="$(jq -n --argjson stmt "$POLICY_STATEMENT" '{ Version: "2012-10-17", Statement: [$stmt] }')"
fi

aws s3api put-bucket-policy --bucket "$S3_BUCKET" --policy "$(echo "$MERGED" | jq -c .)"

DOMAIN_NAME="$(aws cloudfront get-distribution --id "$DIST_ID" --query 'Distribution.DomainName' --output text)"

jq -n \
  --arg id "$DIST_ID" \
  --arg oac "$OAC_ID" \
  --arg cf "$DOMAIN_NAME" \
  '{distributionId: $id, originAccessControlId: $oac, cloudFrontDomainName: $cf}' >"$STATE_FILE"

echo ""
echo "Done."
echo "  CloudFront URL: https://${DOMAIN_NAME}"
echo "  After DNS propagates: https://${CLOUDFRONT_DOMAIN}"
echo ""
echo "DNS: create a CNAME (or Route 53 alias) from ${CLOUDFRONT_DOMAIN} to ${DOMAIN_NAME}"
echo "State saved to ${STATE_FILE} (gitignored)."
echo ""
echo "Deploy site: npm run deploy"
echo "Then invalidate cache: npm run invalidate-cloudfront"
