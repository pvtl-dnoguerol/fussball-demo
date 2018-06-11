#!/bin/bash
export TERM=${TERM:-dumb}
cd fussball-demo-service/fussball-service
gradle -s --no-daemon integrationTest
