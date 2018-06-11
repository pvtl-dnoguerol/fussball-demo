#!/bin/sh 
cd fussball-demo/www
echo "export const environment = { production: true, apiPrefix: 'http://fussball-service.cfapps.io', mapsApiKey: '$GOOGLE_MAPS_API_KEY' };" > src/environments/environment.prod.ts
npm install
ng build --configuration=production
ng build --configuration=production-en
ng build --configuration=production-de
cp -rf dist/www/* ../../build-output2/
mkdir ../../build-output2/en
cp -rf dist/www-en/* ../../build-output2/en/
mkdir ../../build-output2/de
cp -rf dist/www-de/* ../../build-output2/de/
