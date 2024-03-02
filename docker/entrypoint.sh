#!/bin/sh

nitriding -fqdn example.com -ext-pub-port 443 -intport 8080 -wait-for-app &

pnpm exec nx run spa-frontend:serve --configuration=production