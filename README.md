# sport-results

A PWA for sports results.

No tracking, no ad, no data collection, no bloat.
The source of the API is a website with way too much ads, and a bloated UI.

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
Is hosted on ...
