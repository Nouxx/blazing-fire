alter table "menus" enable row level security;

create policy "Enable all actions for authenticated users only"
on "public"."menus"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);