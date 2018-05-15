#!/bin/sh
cd fussball-demo/www
echo "export const environment = { production: true, apiPrefix: 'http://fussball-service.cfapps.io', mapsApiKey: '$GOOGLE_MAPS_API_KEY' };" > src/environments/environment.prod.ts
npm install
ng build --prod
cp -rf dist/www/* ../../build-output2/
echo $GOOGLE_MAPS_API_KEY
