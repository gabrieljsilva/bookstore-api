#!/bin/bash
docker-compose up -d
sleep 10
docker exec bookstore_mongo /scripts/rs-init.sh
docker-compose logs -f