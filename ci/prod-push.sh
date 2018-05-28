#!/bin/bash
export TERM=${TERM:-dumb}
set -e
echo "Logging into CF"
cf login -a $CF_API -o $CF_ORG -s $CF_SPACE -u $CF_USER -p $CF_PASSWD
echo "Adding new route"
cf map-route fussball-service-test $CF_ORG -n fussball-service
echo "Removing old route"
cf unmap-route fussball-service $CF_ORG -n fussball-service
echo "Deleting old service"
cf delete fussball-service -f
echo "Renaming new service"
cf rename fussball-service-test fussball-service
echo "Removing redundant new route"
cf delete-route $CF_ORG -n fussball-service-test -f
