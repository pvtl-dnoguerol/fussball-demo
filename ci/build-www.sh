#!/bin/bash
export TERM=${TERM:-dumb}
echo "pushd"
pushd fussball-demo-www/www
pwd
ng build --prod
cp dist/www/* ../../build-output2/
popd
find .
