#!/usr/bin/env bash

PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your-super-secret-and-long-postgres-password
PGDATABASE=postgres

npx supabase db diff \
    --db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE \
    --use-migra