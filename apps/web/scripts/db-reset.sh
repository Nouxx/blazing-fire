#!/usr/bin/env bash

PGHOST=localhost
PGPORT=$POSTGRES_PORT
PGUSER=postgres
PGPASSWORD=$POSTGRES_PASSWORD
PGDATABASE=$POSTGRES_DB

echo "Resetting database: '$PGDATABASE', host: '$PGHOST:$PGPORT' with user: '$PGUSER'"

npx supabase db reset --db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE <<< 'y'

