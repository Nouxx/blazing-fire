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
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") VALUES
	('9f027cdc-adb2-429c-acb3-a81660596b95', 'e86b38fb-0739-4a55-9b84-de4153002120', 'bde08f84-3914-43d2-861c-bfced3a35093', 's256', 'c224gQS3X2IDEL4y-SrCzgM53TarT_OlhyoaKA47IdA', 'email', '', '', '2024-02-03 22:26:23.430544+00', '2024-02-03 22:26:23.430544+00', 'email/signup'),
	('779ee5d1-aff2-486b-affe-f32ae05bb249', '36b200b1-c5e2-4ff9-8bca-36492d98a848', 'f2e4a1b8-4854-45b5-a050-517763bf23ac', 's256', 'TtdICweAkYlX-v9opwpPkO5NWB0RET8Vd9Ny7xzLTLo', 'email', '', '', '2024-02-03 22:29:55.702539+00', '2024-02-03 22:29:55.702539+00', 'email/signup'),
	('17b62f45-39ae-4a13-bb96-dba72dfd4501', '8706d0d2-c716-4fb1-b66c-3bd756f11463', '2f43644d-85fb-4f24-9c67-2b52bfec898e', 's256', 'GeEAlpBRCM7WKGMTvSQZU3n52wls9m_qjRe1oXL4PlU', 'email', '', '', '2024-02-03 22:32:34.540183+00', '2024-02-03 22:32:34.540183+00', 'email/signup'),
	('2a2a713f-8099-4ea5-8e4c-f27d19198382', 'df085be6-1aa4-4e76-85fa-ca4c089f6717', 'aa4322f8-843c-4aa7-a0b0-5b2d58bd7107', 's256', 'vVw1U5_IMUbpgfUHSHRM4EU0dZLIYjPek2cqTNqzY5o', 'email', '', '', '2024-02-03 22:41:24.246646+00', '2024-02-03 22:41:24.246646+00', 'email/signup'),
	('51195692-f779-4bf3-b09e-ffaae3bd9209', '42bee52d-dda2-418d-b46f-1b0e6be67298', '5931d9c8-6f7f-4365-9dd6-ab65bf456c68', 's256', 'L_t-l4U3R8PBzVnhV8BhiOVhqX0Gn3s4_u03s1kJgsI', 'email', '', '', '2024-02-23 03:21:06.725337+00', '2024-02-23 03:21:06.725337+00', 'email/signup'),
	('0cbe9b6f-bc1a-4a70-86da-1e04c4793352', '657c3464-8f9b-45d3-89d3-9cec98011dfa', '35f838e3-ccb0-45a4-96fd-236f1c1462b3', 's256', 'hIUhjxxnX-nhg8sROcU8ohprMHrY5hBfQr71nZIsS1g', 'email', '', '', '2024-02-23 03:21:59.600516+00', '2024-02-23 03:21:59.600516+00', 'email/signup'),
	('51e9dea5-4402-4e1f-b1a4-019d903d4b7b', '1ee1954d-42ec-4a8b-9a7d-0a85c3ee42a5', 'cc047fed-ce40-4690-9f1c-9d16dcfa29ce', 's256', 'ns6_3t1Fixoy2EuGo8lY2FPl5nmbFmjHf2QAJfDNnBI', 'email', '', '', '2024-02-23 03:24:39.174734+00', '2024-02-23 03:24:39.174734+00', 'email/signup'),
	('874ea3be-7e36-40fc-8010-6c8bff6dda92', 'ce841df0-db0d-44ad-a9af-c7f7e5e96c4a', '6d7f3ad7-41cf-46af-941a-5a3ee8957e96', 's256', 'eg97T9v_F2XKGIpUIm0wfMS9AVQhbvPpbd_7ljxYdjg', 'email', '', '', '2024-02-23 03:25:45.367644+00', '2024-02-23 03:25:45.367644+00', 'email/signup'),
	('fa2cd640-5605-4af0-a7a6-1b31ace51bb5', 'a129f780-5ef6-40dd-add1-c74e1077917c', '65589653-28ef-401a-bb4a-875332f531bf', 's256', '7segL3WIM6v0ZcToja4HNYC7ZUkM5sfJMeT45bhpK3M', 'email', '', '', '2024-02-23 03:44:18.336629+00', '2024-02-23 03:44:18.336629+00', 'email/signup'),
	('4b926de1-9560-4596-aec4-9c333936fd33', '73d29f87-eaf8-434d-82e5-d7993b8ba6ca', '83531605-62b1-4625-be74-08f8e312f535', 's256', '1uU0xccE2OVfxAul2ShgahigHDXOjsDt_VIlve6EkKg', 'email', '', '', '2024-02-23 03:47:28.358959+00', '2024-02-23 03:47:28.358959+00', 'email/signup'),
	('9020d25e-2c6c-4fdb-9eb4-082993950fe5', 'cc44f60c-12eb-4233-bb3d-cb181b121888', '81b59b61-2acc-4d4e-ada5-d3c040ada4ba', 's256', 'cAQYMx42DH0xa3LCsF4kXI13kuCgl-bdC7FU86pWpJg', 'email', '', '', '2024-02-23 03:48:26.052863+00', '2024-02-23 03:48:26.052863+00', 'email/signup'),
	('420a0c5d-b0ed-4307-b696-9e497dc1d79a', '0b847766-ae4b-4947-843e-e952e8fd293a', 'd717461f-bdd6-48f1-b7a9-8734cc76df60', 's256', 'aq1-PZkSsgUQjz3UF4GMJomUtZREVlH9_nZo9FOk6p4', 'email', '', '', '2024-02-23 03:56:52.882664+00', '2024-02-23 03:56:52.882664+00', 'email/signup'),
	('b43179fd-db14-4e2c-be89-129dda1a15f9', '1e2154af-5bfc-499f-894c-c02b52ca08a4', 'fc78fe1e-18b4-4e25-a5dc-ef5479366835', 's256', 'TwKwqXz0RiIisy8YY6ValNE81uGjz19YFUf11DBC4i0', 'email', '', '', '2024-02-23 03:58:54.23733+00', '2024-02-23 03:58:54.23733+00', 'email/signup'),
	('bb8dbcec-c36b-484a-b6ff-dfb9edb7ff44', '9519f4e1-0935-4464-9b15-3b6a901092f4', 'a9119662-4e7f-4e14-91cb-3e396effe0ea', 's256', 'a2gP5knyzV86dGzNRBnMNj5QFmK7aQZGInelrW3laKc', 'email', '', '', '2024-02-23 04:00:13.465921+00', '2024-02-23 04:00:13.465921+00', 'email/signup'),
	('3869d2b8-5a95-44fa-8b54-be1d444f45da', '6e911de2-71d7-461f-bdde-7dd777743bf1', '0ff47306-b8e8-428b-b9bc-e3831b07cb14', 's256', '-SaHSCXcHdgC9cvAif_HPYFQab-gk8U9uSxp1_N_q_c', 'email', '', '', '2024-02-23 04:12:03.702634+00', '2024-02-23 04:12:03.702634+00', 'email/signup'),
	('179f5fe2-1376-44c8-a8e5-797e86c73029', 'fcf0bc4e-2d2a-4abd-aaf6-d07e42c4a395', 'ae3b7a3f-a9a6-4890-bde3-390c80d35582', 's256', 'DzQ5Z6rFVKIu48LibXJaL0lnJra5Kt_1pzPxS6wb2HA', 'email', '', '', '2024-02-23 04:14:25.816872+00', '2024-02-23 04:14:25.816872+00', 'email/signup'),
	('a414435e-afea-4fb8-9ff6-40c842d54a6b', '1f1302b4-94a6-4361-a9c2-3fe2bf3cdb83', '56c118d9-ba19-49af-947c-5ca5c41860e2', 's256', 'wod8j32pSTdYQ9eIWLuLa83fzGkWpf6nd9mOM99FW44', 'email', '', '', '2024-02-23 04:15:17.969899+00', '2024-02-23 04:15:17.969899+00', 'email/signup'),
	('8cc49f32-7b45-4986-b50e-b32f77f802ef', 'f6313103-2def-42b2-967a-92d77bbfad67', 'b30a9c9a-fb13-4c09-bb6d-8f524246f755', 's256', 'Uda1DlZ6NacN6NBmDly48CteVqtwjdP3rIH9kfi3bEE', 'email', '', '', '2024-02-23 04:18:19.49106+00', '2024-02-23 04:18:19.49106+00', 'email/signup'),
	('8f1ee642-fb0c-4de4-b21f-f8f65c1f707c', 'a2ae6c5a-b82c-47c7-938a-d80fc1b82d65', 'ded18066-2086-4e6b-92df-e335839bf32e', 's256', 'xjsGLbOtxdYeyAB-T31jdqXuh5h8S7NJ3MsT5C16ttw', 'email', '', '', '2024-02-23 04:21:46.78519+00', '2024-02-23 04:21:46.78519+00', 'email/signup'),
	('613064a2-09c3-4e30-996e-968cb2961e18', '1dceddcf-d2ad-4ea7-8da3-1613ac05c3bd', '157803cb-bfe3-4e0a-b1f0-340ef76abe00', 's256', 'fI2kORt-YXgxQqlumHJJnsgQoPim8DGk2-WxCuXXVgY', 'email', '', '', '2024-02-23 04:22:27.333566+00', '2024-02-23 04:22:27.333566+00', 'email/signup'),
	('1a54efb2-113a-4f72-ba43-dbf077d7174b', 'd7d5fd24-f5a8-40c7-8611-4f14455196d6', '313b72f9-a700-41dc-a4e6-54bb27bb4bef', 's256', 'Aq_Osx9c13NBvqcYmWv0bjBUG5x7PxdC5NxhAwYeDwM', 'email', '', '', '2024-02-23 04:26:04.514+00', '2024-02-23 04:26:04.514+00', 'email/signup'),
	('2fec7b0d-dc0f-4adb-8068-21aa1c3ef688', '5a5215c2-fae7-45b5-a850-854ff05fc6bf', 'a5eaa948-9ccc-46aa-baa1-6fcc9b4de47f', 's256', 'meyzbg4NyUPziv4ONedDL9veaqxNkQFWrGu2h5xPEDI', 'email', '', '', '2024-02-25 16:07:50.152373+00', '2024-02-25 16:07:50.152373+00', 'email/signup'),
	('94d0fc3c-853b-4035-ab00-28596cf0a977', '780980e4-e1f7-40d9-a65d-73a66e81f97b', '0c8fb76f-3a1d-4657-96f9-17b3b503605c', 's256', 'WTfPS_M6JmTTzRq5LDLLVBQ5EpXTaEcAOV6gbTC_UNw', 'email', '', '', '2024-02-28 04:31:27.005947+00', '2024-02-28 04:31:27.005947+00', 'email/signup'),
	('2b6ba077-0767-45ed-aba0-86582cbe1eee', '24a363a7-6f96-44dc-a225-183fdad34ebe', '42cd184c-6b86-4791-a988-10047f998772', 's256', '_C3v2L7xbAbM3OdmMPuV5wYq8XFpLmAc8efN_ZOUXTs', 'email', '', '', '2024-02-28 04:34:40.924904+00', '2024-02-28 04:34:40.924904+00', 'email/signup'),
	('06afa1cc-48f4-4076-96af-c22d008161af', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'de2752cf-719c-4713-a875-7cded07ce75e', 's256', 'gn-r7w73zAPJxalYuw9E7o3KwtYNfX0H4_EPGYtcfYA', 'email', '', '', '2024-03-16 04:35:58.001916+00', '2024-03-16 04:35:58.001916+00', 'email/signup'),
	('4c6c79ec-fc47-407c-8c72-9b2ec4642fb5', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'f8b1bac4-1232-47f7-9ca1-106533f2ea3d', 's256', 'ncjbTVC83GcT-iqXF2HHs9LZfEbq8Ok37SdCX9x2PEo', 'email', '', '', '2024-03-16 04:38:24.934319+00', '2024-03-16 04:38:24.934319+00', 'email/signup'),
	('9507acc1-48e4-4f04-b12b-8b81066abf90', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '4ca9b79f-06bc-47fb-8265-f8ac5b1d53dd', 's256', 'NuGfQTpix00P3-rtHB4D6ciHLOOfMDc_AXJbBZOqhqc', 'email', '', '', '2024-03-16 04:41:41.066629+00', '2024-03-16 04:41:41.066629+00', 'email/signup'),
	('d3228f5c-db02-4685-98cf-3fa25761e558', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '4787b2ca-c59c-4a7d-83ae-4f929ac6ee53', 's256', 'CiBdvMAzmFXXYENHNtugU6-AtslAPSW2s1Jmc93EXK4', 'email', '', '', '2024-03-16 04:44:40.876644+00', '2024-03-16 04:44:40.876644+00', 'email/signup'),
	('72e0c31e-8db7-4e2f-a9c9-75c2410392f0', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'a5620340-e7f7-4eee-bfd6-900a0991c8f5', 's256', 'zh3-pqXGUF3eSugZfaWpV5pDa7TcWyXNZkuTTnP-ono', 'email', '', '', '2024-03-16 04:49:31.30079+00', '2024-03-16 04:49:31.30079+00', 'email/signup'),
	('fd1d5aac-bedb-4129-b1fc-64765939e07a', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '7dda025d-95e2-497e-8b8e-13c0c3593666', 's256', 'nnlQ_RXuQIRB2KgIE9Pzqrd2yi7onOOAek298q7Apw4', 'email', '', '', '2024-03-16 04:49:51.285181+00', '2024-03-16 04:49:51.285181+00', 'email/signup'),
	('a02b38fa-583f-4e52-a82b-207a8c1e75c0', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'f8708975-9784-4d6d-a0a3-a59fe934f3e5', 's256', 'nJtQNISXG5KroSDqzUB07H0dquswcvlZvD-J2uyhMi0', 'email', '', '', '2024-03-20 04:16:07.685739+00', '2024-03-20 04:16:07.685739+00', 'email/signup'),
	('2d2e853e-fb1c-4ff8-9dbc-15e76fefaba3', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'e58de3fd-150c-4885-b41f-72d90de2486f', 's256', 'zT64hhFjO6S-REeZVxnrAIN8cv8pbSh4-F0ewEP7sEY', 'email', '', '', '2024-03-20 04:33:39.379428+00', '2024-03-20 04:33:39.379428+00', 'email/signup'),
	('1a94a5c0-8ccc-4c5b-af12-88082c2c3f0f', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'cd7b68fa-bc84-4673-a72c-767dc41e7d24', 's256', 'FhQIX50n6QVfctgkKuRZFzjrtbv9ObRps66RvwTfSL0', 'email', '', '', '2024-03-20 04:45:28.826486+00', '2024-03-20 04:45:28.826486+00', 'email/signup'),
	('ba76515b-6886-4451-a477-55449aa6decc', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'bde6d479-d4b2-45a7-ac8a-50fa5a5c37d2', 's256', '3ZJ1F2y3rAy5W0ppmsFwFE0WqWlLrwQ9UBCmTRZQjFI', 'email', '', '', '2024-03-20 04:49:30.606477+00', '2024-03-20 04:49:30.606477+00', 'email/signup'),
	('69d421d0-aba3-47d0-8257-68d4069cc964', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '13db7452-f8e3-4c78-8c52-90275da12440', 's256', 'bqqtMHiGexJVm2FSaFCp0nJt4BJZ5WZHKFujz2_maK4', 'email', '', '', '2024-03-20 05:00:30.553539+00', '2024-03-20 05:00:30.553539+00', 'email/signup'),
	('b4ba2319-27de-4a17-9ea9-b1295b54adc2', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '0aa46976-427a-41c8-8bdf-79f8ee8e8c9b', 's256', '6DDGUicnPT7u1o_Yy48jVnu6bRhHgjIVEOL2dCrqoDM', 'email', '', '', '2024-03-20 05:01:15.216017+00', '2024-03-20 05:01:15.216017+00', 'email/signup'),
	('5c1cba46-189b-4a53-9a4c-dd4008ad4761', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '9ff9a429-2802-4997-ad6d-914ea4b4843a', 's256', 'Oqdo2hhtOu4dXLAV30z_J3rn6MeoYN0B2iRekD37OeI', 'email', '', '', '2024-03-20 05:03:00.30676+00', '2024-03-20 05:03:00.30676+00', 'email/signup'),
	('d6b83bf7-33b3-45ad-b113-530816a80c7c', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '9de738e7-94eb-41d9-8981-9cd6c449bb8f', 's256', 'i3S7AZ2Vk7c7s9ZcrxKtAXHlRALGiUjhJnoZKr5fMpI', 'email', '', '', '2024-03-20 05:09:36.722803+00', '2024-03-20 05:09:36.722803+00', 'email/signup'),
	('93cba676-7909-4caa-9822-9cd12b2eb7c1', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'e959db8e-8370-4fd1-8781-33de839da844', 's256', '1cHLNNt6a5Psdy85XhzHDIRE-ds3pHQjU-kSIJZ4iX0', 'email', '', '', '2024-03-20 05:10:20.382819+00', '2024-03-20 05:10:20.382819+00', 'email/signup'),
	('d73cabaf-2d26-4060-a3b0-91702de18e66', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '86addffe-94ca-4dbc-bb76-f184d75deb8c', 's256', 'lFv9CaNbDIU7I95HOF7FLBX0irwjbEATWF-9VTNFK04', 'email', '', '', '2024-03-20 05:10:23.305348+00', '2024-03-20 05:10:23.305348+00', 'email/signup'),
	('6f1b2a33-5f46-4a0b-afb6-95a72acb30dd', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '8e8bb1a4-5f56-4609-96a3-72e175365874', 's256', '2tJCXlfzj2FlcaZ65Gg0QM_aADwQJcPQDnS-UUo2j7M', 'email', '', '', '2024-03-20 05:12:30.768344+00', '2024-03-20 05:12:30.768344+00', 'email/signup'),
	('88f2fec9-fdba-4bb9-9a09-e07c3ac4f3f9', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'd2916131-b061-477b-a988-804fbaa91f00', 's256', 'fbzUVN0XTGadR8OGEzRcMmV3p4DiNsM-Me9pNYQtb2Q', 'email', '', '', '2024-03-20 05:14:15.169399+00', '2024-03-20 05:14:15.169399+00', 'email/signup'),
	('b8bc6b46-51af-40c1-a127-444da0a073a6', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '1bb38526-2636-4fc7-a7c5-c206698fc31b', 's256', 'RGnUI5ysm0GdSWRDfyw6liTGfArLxPnWj2-WWNrViyY', 'email', '', '', '2024-03-20 05:16:41.869044+00', '2024-03-20 05:16:41.869044+00', 'email/signup'),
	('0baaf5e8-6ab9-43e9-b8f5-765685b3e967', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', '4999a3ce-91cb-4285-8147-d03b58cc145d', 's256', 'ON43TY4g79xGRRu8Z8fUrd1A0eeGaE12FjCZD-7SkYg', 'email', '', '', '2024-03-20 05:17:40.596945+00', '2024-03-20 05:17:40.596945+00', 'email/signup'),
	('2780e1fd-aacd-4745-8627-8e9080562f22', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'c031cc4e-1a6f-4922-a255-5118c288a567', 's256', 'WzW4Vcx8WIo8wu5dYJiDaQP2slK1EJC5cTqOLjbq4Bs', 'email', '', '', '2024-03-20 05:19:11.356014+00', '2024-03-20 05:19:11.356014+00', 'email/signup'),
	('27bc77bb-ce4c-4a67-a4bd-baf87e2d0b7a', 'bb9aa762-3ac1-4afe-ae98-e4df007caeb7', 'e2099971-63e9-4276-8df1-1d49ae99879d', 's256', 'Fi1m12c22xPDq7C8ivxHGsOqXv0pRogClVSriO4fpC0', 'email', '', '', '2024-03-20 05:21:14.467075+00', '2024-03-20 05:21:14.467075+00', 'email/signup'),
	('c51c8e43-5bbf-4f4f-896c-c49b087588fe', 'b4a33925-dbcc-4688-ac8f-700cac6a7f03', '82ce4660-6fc3-4ba2-bacb-369ff1f3a6f4', 's256', 'wMNxMiZ2W8xRE8fR8EcisCab3S-1pM6Y5BnMVkJYZjI', 'email', '', '', '2024-03-20 05:25:16.500478+00', '2024-03-20 05:25:16.500478+00', 'email/signup'),
	('986f463c-4225-4668-bf36-5b12976c40aa', 'd36f824f-31e9-4b39-aed8-b20bad480399', 'a8a0e9ca-1d96-4e20-925b-708f98f6c2cd', 's256', 'gwd4YVaN01h2tLPf4qQUFfhw2T1F0QaDxz3qZQwczg0', 'email', '', '', '2024-03-22 02:21:37.994963+00', '2024-03-22 02:21:37.994963+00', 'email/signup'),
	('57a03056-5897-4743-bf7f-27b7047dcad5', 'd36f824f-31e9-4b39-aed8-b20bad480399', '5a3ffec9-ed09-493c-8de8-43e1e162735e', 's256', 'IyZs4tOFvtPMpXApZFGOwUZp24om5YQ5SL9I5rE-dbA', 'email', '', '', '2024-03-22 02:27:45.054478+00', '2024-03-22 02:27:45.054478+00', 'email/signup'),
	('5e679918-f4d5-4662-b313-140a046d4fc4', '0b06b7eb-8429-4c9c-aa70-ef666ccdd089', '263027ca-7dbf-4531-b63d-4a435cec03ab', 's256', 'SjY3Y15sNdP7I2lXDbEIoXXzleRB7octbscFNFmGTrE', 'email', '', '', '2024-03-22 02:28:48.575593+00', '2024-03-22 02:28:48.575593+00', 'email/signup'),
	('d1f237b7-7beb-4b46-9f86-d30167d5c9c0', '0b06b7eb-8429-4c9c-aa70-ef666ccdd089', 'c983fb6d-394b-4853-a56b-1db422ffa887', 's256', 'GwbPjMaKPNOHjrvIF2yZ8Zqa42Ls9XakDtAQdU0hJ9Y', 'email', '', '', '2024-03-22 02:30:00.342555+00', '2024-03-22 02:30:00.342555+00', 'email/signup'),
	('ee3c0339-e88f-44b2-ac9a-1d37871c368d', '0b06b7eb-8429-4c9c-aa70-ef666ccdd089', 'aca0b853-9fab-4ac0-ab92-7d5da2370de8', 's256', 'xRF4oaT7D6ZKV_CRnjJGnhVTm_cTdE-F-SehS33VeT4', 'email', '', '', '2024-03-22 02:30:33.407655+00', '2024-03-22 02:30:33.407655+00', 'email/signup'),
	('cb0a4181-b89e-46f3-a3af-87ce4685efa5', '0b06b7eb-8429-4c9c-aa70-ef666ccdd089', '8a7351ce-6056-4106-a569-c609ba343961', 's256', 'iVlaKdH15PuI_rvBrlh2Y4oXmwJtsmF20pm3bjy0jH0', 'email', '', '', '2024-03-22 02:46:03.743166+00', '2024-03-22 02:46:03.743166+00', 'email/signup'),
	('094af82a-7c94-429a-b340-874bd733ac97', 'e8941c78-f9fc-47fd-b176-c61fd35f72e3', '7f491911-57f8-4499-8e78-135fff708a9e', 's256', '0_ED6lKxZ4iiRnX2fjXV11NRvPVdsyo2HElAxNSELjE', 'email', '', '', '2024-03-22 02:50:03.352657+00', '2024-03-22 02:50:03.352657+00', 'email/signup'),
	('b2186ea5-bcdc-4c88-85ef-262666acab3e', 'e8941c78-f9fc-47fd-b176-c61fd35f72e3', 'ce7128df-1d4b-41dc-bbef-82a877188e2d', 's256', 'Qd20BPw3yzIOqONU80cKVtXWby82QA9cLC9OEdII9-I', 'email', '', '', '2024-03-22 02:50:54.39282+00', '2024-03-22 02:50:54.39282+00', 'email/signup'),
	('5ca457bb-d80c-451f-9a82-94d101eca4cc', 'e8941c78-f9fc-47fd-b176-c61fd35f72e3', 'f8dd2ccd-0492-4af9-99df-176349b77937', 's256', 'EATEiNAxaAkKC1CDC9m0VVa9SAqUiZ7LOj3z4IQzhYI', 'email', '', '', '2024-03-22 02:55:33.520408+00', '2024-03-22 02:55:33.520408+00', 'email/signup'),
	('b8c64e80-a89a-4490-9860-33d6c55a7de3', 'e8941c78-f9fc-47fd-b176-c61fd35f72e3', '55d5873a-0fd6-45af-baaf-a4bc0fcf60ca', 's256', 'K5b9XCcvU9B1_x4ssY7fKOXiz1_9t9V_ZWwzPDP-3Ag', 'email', '', '', '2024-03-22 02:59:47.560562+00', '2024-03-22 02:59:47.560562+00', 'email/signup'),
	('4a21fd38-4771-4b4d-a53a-29fe53b9211b', 'e8941c78-f9fc-47fd-b176-c61fd35f72e3', '0023755a-37b4-4608-8a16-2b477aa30bdd', 's256', 'P7uz3FesS5ZnylVJWxwhzCoPuTvaqLU2OX1VezesnC0', 'email', '', '', '2024-03-22 03:01:32.057322+00', '2024-03-22 03:01:32.057322+00', 'email/signup');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '3bcf3c25-acb6-4aed-a7de-37957bc59678', 'authenticated', 'authenticated', 'me@mail.com', '$2a$10$yxxLVaoavPMIAu9jY/Trqe.i7/p12ghNspjPuRNmJlVt/UR6q2rMC', '2024-01-30 04:58:39.620858+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-03-22 03:40:13.381211+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-01-30 04:58:39.617082+00', '2024-03-22 03:40:13.382503+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


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
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."menus" ("id", "name", "user_id", "created_at") OVERRIDING SYSTEM VALUE VALUES
	(1, 'My Menu', '3bcf3c25-acb6-4aed-a7de-37957bc59678', '2024-05-01 03:58:17.929713+00');


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 136, true);


--
-- Name: menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."menus_id_seq"', 1, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;

--
-- Custom: Create functions required for e2e tests
--

CREATE OR REPLACE FUNCTION get_user_id_by_email(email TEXT)
RETURNS TABLE (id uuid)
SECURITY definer
AS $$
BEGIN
  RETURN QUERY SELECT au.id FROM auth.users au WHERE au.email = $1;
END;
$$ LANGUAGE plpgsql;
