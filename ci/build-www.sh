#!/bin/sh
cd fussball-demo/www
ng build --prod
cp -rf dist/www/* ../../build-output2/
