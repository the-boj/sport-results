#!/usr/bin/env bash
# Sends a default invalidation for /* using distribution id from setup state.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_FILE="${ROOT_DIR}/scripts/.cloudfront-state.json"

DEFAULT_INVALIDATION='/*'
PATHS="${INVALIDATION_PATHS:-$DEFAULT_INVALIDATION}"

if [[ ! -f "$STATE_FILE" ]]; then
  echo "Missing ${STATE_FILE}. Run: npm run setup-cloudfront (with ACM_CERTIFICATE_ARN set)." >&2
  exit 1
fi

DIST_ID="$(jq -r '.distributionId // empty' "$STATE_FILE")"
if [[ -z "$DIST_ID" ]]; then
  echo "State file has no distributionId." >&2
  exit 1
fi

CALLER_REF="invalidate-$(date +%s)-$$"
aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "$PATHS" \
  --caller-reference "$CALLER_REF" \
  --output json

echo "Invalidation submitted for distribution $DIST_ID (paths: $PATHS)"
