#!/usr/bin/env bash

SEED_FILE_PATH=../supabase/seed.sql
PG_DUMP_FILE_PATH=../supabase/pg_dump.sh
DEV_FIXTURES_FILE_PATH=../supabase/dev-fixtures.sql

echo -n "Dumping database..."

$PG_DUMP_FILE_PATH > $SEED_FILE_PATH

echo " ok"

echo -n Appending dev fixtures...

cat $DEV_FIXTURES_FILE_PATH >> $SEED_FILE_PATH

echo " ok"