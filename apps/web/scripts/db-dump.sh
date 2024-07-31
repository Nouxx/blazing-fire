#!/usr/bin/env bash

PGHOST=localhost
PGPORT=$POSTGRES_PORT
PGUSER=postgres
PGPASSWORD=$POSTGRES_PASSWORD
PGDATABASE=$POSTGRES_DB

SEED_FILE_PATH=supabase/seed.sql
DEV_FIXTURES_FILE_PATH=supabase/dev-fixtures.sql

echo "Dumping database: '$PGDATABASE', host: '$PGHOST:$PGPORT' with user: '$PGUSER'"

npx supabase db dump \
    --db-url postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE \
    --file $SEED_FILE_PATH \
    --data-only \
    --schema auth,public \
    --exclude auth.audit_log_entries

echo -n Appending dev fixtures...

cat $DEV_FIXTURES_FILE_PATH >> $SEED_FILE_PATH

echo " ok"
