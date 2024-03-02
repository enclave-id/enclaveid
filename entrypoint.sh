#!/bin/sh

nitriding -fqdn enclaveid.com -extport 443 -intport 8080 -wait-for-app &
echo "[sh] Started nitriding as reverse proxy."

sleep 1

pnpm exec nx run api:serve --configuration=production
echo "[sh] Started api."