#!/usr/bin/env bash

PGHOST=localhost
PGUSER=postgres
PGPASSWORD=your-super-secret-and-long-postgres-password
PGDATABASE=postgres

echo "Generating types for database: '$PGDATABASE', host: '$PGHOST' with user: '$PGUSER'"

npx supabase gen types \
	--db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST/$PGDATABASE 
	--lang=typescript > src/lib/database/generated-types.ts
