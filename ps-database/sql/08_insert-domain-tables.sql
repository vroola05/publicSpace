\connect publicspace

--
-- TOC entry 3145 (class 0 OID 16608)
-- Dependencies: 204
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.domain (id, company_id, domain, name, domain_type) VALUES (nextval('public.seq_domain_id'), get_last_id('public.seq_company_id'), 'localhost', 'Municipal Public Space', get_domain_type('Gemeente'));

-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de groepen toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

INSERT INTO public.groups (id, name, domain_id) VALUES (nextval('public.seq_group_id'), 'Groenvoorziening', currval('public.seq_domain_id'));
INSERT INTO public.groups (id, name, domain_id) VALUES (nextval('public.seq_group_id'), 'Handhaving', currval('public.seq_domain_id'));
INSERT INTO public.groups (id, name, domain_id) VALUES (nextval('public.seq_group_id'), 'Onderhoud', currval('public.seq_domain_id'));