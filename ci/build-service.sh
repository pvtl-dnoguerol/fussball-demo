#!/bin/bash

export TERM=${TERM:-dumb}
cd fussball-demo/fussball-service
./gradlew --no-daemon build