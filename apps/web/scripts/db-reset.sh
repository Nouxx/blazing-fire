#!/usr/bin/env bash

# this script is supposed to be run inside the dev docker container
# docker compose run --rm dev npm run db:reset

PGHOST=$POSTGRES_HOST 
PGUSER="postgres"
PGPASSWORD=$POSTGRES_PASSWORD
PGDATABASE=$POSTGRES_DB

echo "Resetting database: '$PGDATABASE', host: '$PGHOST' with user: '$PGUSER'"

npx supabase db reset --db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST/$PGDATABASE