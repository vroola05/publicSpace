\connect publicspace


--
-- TOC entry 3159 (class 0 OID 40632)
-- Dependencies: 210
-- Data for Name: main_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.main_category (id, name, company_id) VALUES (nextval('public.seq_maincategory_id'), 'Wegen', 1);
INSERT INTO public.main_category (id, name, company_id) VALUES (nextval('public.seq_maincategory_id'), 'Water', 1);
INSERT INTO public.main_category (id, name, company_id) VALUES (nextval('public.seq_maincategory_id'), 'Overlast', 1);


--
-- TOC entry 3161 (class 0 OID 40638)
-- Dependencies: 211
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), 1, 'Gat in de weg', '2021-01-01', NULL, true, 1);
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), 2, 'Overlast', '2021-01-01', NULL, true, 1);
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), 3, 'Hangjongeren', '2021-01-01', NULL, true, 1);


INSERT INTO public.call (id, description, category_id, casenumber, company_id, status_id, group_id) VALUES (nextval('public.seq_call_id'), 'Testmelding 1', 1, '1000000', 1, 1, 1);
INSERT INTO public.location (id, street, number, letter, postal, city, area, x, y, call_id) VALUES ( nextval( 'public.seq_location_id'), 'Piratenweg', '1' ,'a', '2121AA', 'Hoofddorp', 1, 0, 0, currval('public.seq_call_id'));

