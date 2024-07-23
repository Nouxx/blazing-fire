#!/usr/bin/env bash

PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your-super-secret-and-long-postgres-password
PGDATABASE=postgres

SEED_FILE_PATH=supabase/seed.sql
DEV_FIXTURES_FILE_PATH=supabase/dev-fixtures.sql

npx supabase db dump \
    --db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE \
    --file $SEED_FILE_PATH \
    --data-only \
    --schema auth,public \
    --exclude auth.audit_log_entries

echo -n Appending dev fixtures...

cat $DEV_FIXTURES_FILE_PATH >> $SEED_FILE_PATH

echo " ok"