#!/bin/bash
export TERM=${TERM:-dumb}
pushd fussball-demo/fussball-service
gradle --no-daemon test
