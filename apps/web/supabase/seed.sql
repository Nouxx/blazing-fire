SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('bf0d8eeb-5447-4d27-9df6-afc393701170', 'b67cd35d-1e25-418a-a68b-afa0aaaabe36', 'd5523aa9-8c43-4990-ab77-38a193f4b8af', 's256', 'ud38wa1MM5RH5CEX432LStO4Uwsm0luoYUZlywfnNvc', 'email', '', '', '2024-05-03 00:43:27.988559+00', '2024-05-03 00:43:27.988559+00', 'email/signup', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'b67cd35d-1e25-418a-a68b-afa0aaaabe36', 'authenticated', 'authenticated', 'user1@test.com', '$2a$10$gRROztkCQNubJlK/OoIFHuJURl1A32Ugz/EQGjFcbRuo0qo0e4fyi', '2024-05-03 00:43:49.943861+00', NULL, '', '2024-05-03 00:43:27.989068+00', '', NULL, '', '', NULL, '2024-05-03 00:44:05.606283+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-03 00:43:27.985282+00', '2024-05-03 00:44:05.607337+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('b67cd35d-1e25-418a-a68b-afa0aaaabe36', 'b67cd35d-1e25-418a-a68b-afa0aaaabe36', '{"sub": "b67cd35d-1e25-418a-a68b-afa0aaaabe36", "email": "user1@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-03 00:43:27.987576+00', '2024-05-03 00:43:27.987596+00', '2024-05-03 00:43:27.987596+00', 'f7e99e49-59a1-418f-9f68-0f565040d8d4');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('43c6da02-9233-4a06-b1bb-ffad2cd71c1d', 'b67cd35d-1e25-418a-a68b-afa0aaaabe36', '2024-05-03 00:43:49.944297+00', '2024-05-03 00:43:49.944297+00', NULL, 'aal1', NULL, NULL, 'undici', '192.168.65.1', NULL),
	('c78ba68b-0bd2-476c-af61-4697a485acf5', 'b67cd35d-1e25-418a-a68b-afa0aaaabe36', '2024-05-03 00:44:05.606383+00', '2024-05-03 00:44:05.606383+00', NULL, 'aal1', NULL, NULL, 'undici', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('43c6da02-9233-4a06-b1bb-ffad2cd71c1d', '2024-05-03 00:43:49.94604+00', '2024-05-03 00:43:49.94604+00', 'otp', 'ab04f9d7-2759-4396-8ac3-2f681d331a98'),
	('c78ba68b-0bd2-476c-af61-4697a485acf5', '2024-05-03 00:44:05.60748+00', '2024-05-03 00:44:05.60748+00', 'password', 'b0aa6243-0a9c-4ef6-8c13-1cbbbe3c9d2d');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'yBDzCg8yqozapNuBMNDp4A', 'b67cd35d-1e25-418a-a68b-afa0aaaabe36', false, '2024-05-03 00:43:49.945032+00', '2024-05-03 00:43:49.945032+00', NULL, '43c6da02-9233-4a06-b1bb-ffad2cd71c1d'),
	('00000000-0000-0000-0000-000000000000', 2, 'qZY3ku6zKtYVzqcsl5txNQ', 'b67cd35d-1e25-418a-a68b-afa0aaaabe36', false, '2024-05-03 00:44:05.606901+00', '2024-05-03 00:44:05.606901+00', NULL, 'c78ba68b-0bd2-476c-af61-4697a485acf5');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 2, true);


--
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."menus_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;

--
-- Custom SQL fixtures required for local environment
--

--
-- Function required for e2e tests
--

CREATE OR REPLACE FUNCTION get_user_id_by_email(email TEXT)
RETURNS TABLE (id uuid)
SECURITY definer
AS $$
BEGIN
  RETURN QUERY SELECT au.id FROM auth.users au WHERE au.email = $1;
END;
$$ LANGUAGE plpgsql;
