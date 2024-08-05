#!/usr/bin/env bash

PGHOST=localhost
PGPORT=$POSTGRES_PORT
PGUSER=postgres
PGPASSWORD=$POSTGRES_PASSWORD
PGDATABASE=$POSTGRES_DB

echo "Generating types for database: '$PGDATABASE', host: '$PGHOST' with user: '$PGUSER'"

npx supabase gen types \
	--db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE \
	--lang=typescript > src/lib/database/generated-types.ts
