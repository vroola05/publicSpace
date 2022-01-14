\connect publicspace

--
-- TOC entry 3149 (class 0 OID 16640)
-- Dependencies: 208
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'ROLE_USER', true, true);
INSERT INTO public.roles VALUES (2, 'ROLE_ADMIN', true, NULL);
INSERT INTO public.roles VALUES (3, 'ROLE_VIEWER', NULL, NULL);

--
-- TOC entry 3167 (class 0 OID 25098)
-- Dependencies: 226
-- Data for Name: domain_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.domain_type VALUES (1, 'Gemeente');
INSERT INTO public.domain_type VALUES (2, 'Aannemer');

--
-- TOC entry 3168 (class 0 OID 33312)
-- Dependencies: 227
-- Data for Name: action_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.action_type (id, name, domain_type) VALUES (0, 'Toewijzen persoon', NULL);
INSERT INTO public.action_type (id, name, domain_type) VALUES (1, 'Toewijzen groep', NULL);
INSERT INTO public.action_type (id, name, domain_type) VALUES (2, 'Melding aanmaken', 1);
INSERT INTO public.action_type (id, name, domain_type) VALUES (3, 'Melding afsluiten', 1);
INSERT INTO public.action_type (id, name, domain_type) VALUES (4, 'Melding afbreken', 1);
INSERT INTO public.action_type (id, name, domain_type) VALUES (5, 'Opdracht aanmaken', 2);
INSERT INTO public.action_type (id, name, domain_type) VALUES (6, 'Opdracht accepteren', 2);
INSERT INTO public.action_type (id, name, domain_type) VALUES (7, 'Opdracht weigeren', 2);
INSERT INTO public.action_type (id, name, domain_type) VALUES (8, 'Opdracht gereedmelden', 2);
INSERT INTO public.action_type (id, name, domain_type) VALUES (9, 'Opdracht goedkeuren', 1);
INSERT INTO public.action_type (id, name, domain_type) VALUES (10, 'Opdracht afkeuren', 1);
INSERT INTO public.action_type (id, name, domain_type) VALUES (11, 'Opdracht annuleren', 1);
INSERT INTO public.action_type (id, name, domain_type) VALUES (12, 'Terug', NULL);
INSERT INTO public.action_type (id, name, domain_type) VALUES (13, 'Annuleren', NULL);
INSERT INTO public.action_type (id, name, domain_type) VALUES (14, 'Volgende', NULL);


--
-- TOC entry 3139 (class 0 OID 24849)
-- Dependencies: 231
-- Data for Name: page_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page_type VALUES (1, 'overview');
INSERT INTO public.page_type VALUES (2, 'details');
INSERT INTO public.page_type VALUES (3, 'assign');
INSERT INTO public.page_type VALUES (4, 'newLocation');
INSERT INTO public.page_type VALUES (5, 'newInformation');
INSERT INTO public.page_type VALUES (6, 'newConfirm');
INSERT INTO public.page_type VALUES (7, 'orderCreation');
INSERT INTO public.page_type VALUES (8, 'orderConfirm');


--
-- TOC entry 3139 (class 0 OID 33045)
-- Dependencies: 236
-- Data for Name: page_button_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page_button_type VALUES (1, 'containedPrimary');
INSERT INTO public.page_button_type VALUES (2, 'containedSecondary');
INSERT INTO public.page_button_type VALUES (3, 'outlinePrimary');
INSERT INTO public.page_button_type VALUES (4, 'outlineSecondary');
INSERT INTO public.page_button_type VALUES (5, 'blank');
