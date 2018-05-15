#!/bin/sh
cd fussball-demo/www
npm install
ng build --prod
cp -rf dist/www/* ../../build-output2/
