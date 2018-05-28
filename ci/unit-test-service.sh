#!/bin/bash
export TERM=${TERM:-dumb}
cd fussball-demo/fussball-service
gradle -s --no-daemon test
