#!/bin/bash
export TERM=${TERM:-dumb}
set -e

echo "Logging into CF"
cf login -a $CF_API -o $CF_ORG -s $CF_SPACE -u $CF_USER -p $CF_PASSWD

echo "Checking for blue www deployment"
cf check-route ekfg-blue $CF_DOMAIN | grep 'does exist' &> /dev/null
if [ $? == 0 ]; then
	echo "Adding blue route to www"
	cf map-route ekfg-blue $CF_DOMAIN -n ekfg
	echo "Removing green www route"
	cf unmap-route ekfg $CF_DOMAIN -n ekfg
	echo "Deleting green www"
	cf delete ekfg -f
	echo "Renaming blue www to green"
	cf rename ekfg-blue ekfg
	echo "Removing blue www route"
	cf delete-route $CF_DOMAIN -n ekfg-blue -f
else
	echo "No blue www route found; skipping"
fi
