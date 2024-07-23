#!/usr/bin/env bash

PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your-super-secret-and-long-postgres-password
PGDATABASE=postgres

echo "Resetting database: '$PGDATABASE', host: '$PGHOST:$PGPORT' with user: '$PGUSER'"

npx supabase db reset --db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE
