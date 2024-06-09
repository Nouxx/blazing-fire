create table
menus (
id bigint primary key generated always as identity,
name text not null,
user_id uuid not null references auth.users on delete cascade,
created_at timestamptz default now()
);