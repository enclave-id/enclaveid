#!/bin/bash

# This is the actual entrypoint CMD: we gotta wait for the X server to be ready
sed -i '$i HOSTNAME="${HOSTNAME}" node /config/chrome-controller &' /config/startwm.sh

sleep infinity
