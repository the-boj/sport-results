# sport-results

A PWA for sports results.

No tracking, no ad, no data collection, no bloat.
The source of the API is a website with way too much ads, and a bloated UI.

Works both on mobile and desktop

https://sports.dealvault.fr/

## Where does the data come from

The data comes from a well-known sports website, originaly newspaper, called [L'Équipe](https://www.lequipe.fr/).
They have a really good "live" page that gather main sports, and main competitions. So you won't have to scroll to find usual sports.
For example for football, it will only give you the main competitions, and not the lower leagues (only for France).
It's a pretty good summary of the sports results going on when you're not really deep into any sport.
Since it's a french website, the data is in french, and therefor there is no sports that are not followed in France.
You will find NBA, but not NFL, NHL, MLB, ... You will sometimes find American competitions, but only when it's trending in France too.
The API is open, and is pretty good, so we're just fetching the data from there.
We're not using the live results options that they have, because we don't want to use Websockets and complexify the code.

## How it is built

It's a React app, with TailwindCSS, and build with Vite. Minimum dependencies.
Components are mostly mirroring the API.
Is hosted as static website on S3 (`npm run deploy`) with CloudFront in front.

### CloudFront + custom domain (e.g. sports.dealvault.fr)

1. ACM: certificate in **us-east-1** for your hostname (required by CloudFront), DNS-validated.
2. Run once (from repo root, with your real cert ARN):

   ```bash
   export ACM_CERTIFICATE_ARN='arn:aws:acm:us-east-1:YOUR_ACCOUNT:certificate/UUID'
   npm run setup-cloudfront
   ```

   Defaults match `package.json` deploy: bucket `sports-results-578273199980-eu-west-3-an`, region `eu-west-3`, alias `sports.dealvault.fr`. Override with `S3_BUCKET`, `S3_BUCKET_REGION`, `CLOUDFRONT_DOMAIN` if needed.

3. In DNS, point the hostname to the CloudFront domain name the script prints (CNAME, or Route 53 alias to the distribution).

4. After each deploy, refresh CDN cache: `npm run invalidate-cloudfront`.

State is stored in `scripts/.cloudfront-state.json` (gitignored). Delete that file only if you intentionally replace the distribution.

## Details

Some rankings are not available on the API, so we have to fetch them as an iFrame from the website. The list of rankings that are concerned can be found below.
We check the JS and CSS files, and there are no really dangerous code.
But keep in mind that this is not API only, and you might want to avoid those pages.

If there is no rankings button available there, it's because it's not supported yet (either as API or iFrame).

### Rankings from iFrame

- Basketball:
  - NBA
