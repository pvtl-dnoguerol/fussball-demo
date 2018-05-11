#!/bin/bash
export TERM=${TERM:-dumb}
pushd fussball-demo/fussball-service
./gradlew --no-daemon build
cp build/libs/*.jar ../build
popd