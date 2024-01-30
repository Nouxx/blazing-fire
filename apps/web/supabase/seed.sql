SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'd174c785-886e-4376-8889-6bf78fe8918a', '{"action":"user_signedup","actor_id":"3bcf3c25-acb6-4aed-a7de-37957bc59678","actor_username":"me@mail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2024-01-30 04:58:39.620368+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c106481-0148-4642-8cfa-3dfbc80586a9', '{"action":"login","actor_id":"3bcf3c25-acb6-4aed-a7de-37957bc59678","actor_username":"me@mail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-01-30 04:58:39.623097+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ee1148d-df87-42db-9a19-8ed42879ddb2', '{"action":"logout","actor_id":"3bcf3c25-acb6-4aed-a7de-37957bc59678","actor_username":"me@mail.com","actor_via_sso":false,"log_type":"account"}', '2024-01-30 04:59:38.83239+00', ''),
	('00000000-0000-0000-0000-000000000000', '0529dfa5-4f78-4f60-9e75-2bce1eb69f10', '{"action":"login","actor_id":"3bcf3c25-acb6-4aed-a7de-37957bc59678","actor_username":"me@mail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-01-30 04:59:53.786496+00', ''),
	('00000000-0000-0000-0000-000000000000', '94bb9424-4850-4210-8dbb-505ff0ee8e84', '{"action":"logout","actor_id":"3bcf3c25-acb6-4aed-a7de-37957bc59678","actor_username":"me@mail.com","actor_via_sso":false,"log_type":"account"}', '2024-01-30 05:00:07.444576+00', '');

--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '3bcf3c25-acb6-4aed-a7de-37957bc59678', 'authenticated', 'authenticated', 'me@mail.com', '$2a$10$yxxLVaoavPMIAu9jY/Trqe.i7/p12ghNspjPuRNmJlVt/UR6q2rMC', '2024-01-30 04:58:39.620858+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-01-30 04:59:53.787386+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-01-30 04:58:39.617082+00', '2024-01-30 04:59:53.789025+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('3bcf3c25-acb6-4aed-a7de-37957bc59678', '3bcf3c25-acb6-4aed-a7de-37957bc59678', '{"sub": "3bcf3c25-acb6-4aed-a7de-37957bc59678", "email": "me@mail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-01-30 04:58:39.619694+00', '2024-01-30 04:58:39.619714+00', '2024-01-30 04:58:39.619714+00', '23c8a767-4697-4793-be31-55db57192b18');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



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
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 42, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
