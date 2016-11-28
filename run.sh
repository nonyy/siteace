#!/bin/sh

set -e

docker run -d --name mongo mvertes/alpine-mongo:3.2.10-3
docker run -d --link mongo:db --name meteor -p 3000:80 nonyy/siteace
