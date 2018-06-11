#!/bin/bash
export TERM=${TERM:-dumb}
pushd fussball-demo-service/fussball-service
./gradlew --no-daemon build
cp build/libs/*.jar ../../build-output/
popd
find .
