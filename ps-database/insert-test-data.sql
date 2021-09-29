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

--
-- TOC entry 3159 (class 0 OID 40632)
-- Dependencies: 210
-- Data for Name: main_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.call (id, description, date_created, date_ended, category_id, casenumber, priority, notification, company_id, status_id, user_id, group_id) VALUES 
    (nextval('public.seq_call_id'), 'Test voor nieuw', '2021-01-01 00:00:00+02', NULL, 1, '1000000', false, NULL, 1, 3, NULL, 1);

INSERT INTO public.call (id, description, date_created, date_ended, category_id, casenumber, priority, notification, company_id, status_id, user_id, group_id) VALUES 
    (nextval('public.seq_call_id'), 'Test2 voor nieuw', '2021-02-12 00:00:00+02', NULL, 2, '1000001', false, NULL, 1, 1, NULL, 1);

INSERT INTO public.call (id, description, date_created, date_ended, category_id, casenumber, priority, notification, company_id, status_id, user_id, group_id) VALUES 
    (nextval('public.seq_call_id'), 'Nog een test', '2021-02-13 00:00:00+02', NULL, 3, '1000002', false, NULL, 1, 2, 1, 1);

INSERT INTO public.call (id, description, date_created, date_ended, category_id, casenumber, priority, notification, company_id, status_id, user_id, group_id) VALUES 
    (nextval('public.seq_call_id'), 'Test voor mooi', '2021-04-23 00:00:00+02', NULL, 2, '1000003', false, NULL, 1, 2, 1, 1);

INSERT INTO public.call (id, description, date_created, date_ended, category_id, casenumber, priority, notification, company_id, status_id, user_id, group_id) VALUES 
    (nextval('public.seq_call_id'), 'Test nog een', '2021-05-03 00:00:00+02', NULL, 3, '1000004', false, NULL, 1, 2, 1, 1);

INSERT INTO public.call (id, description, date_created, date_ended, category_id, casenumber, priority, notification, company_id, status_id, user_id, group_id) VALUES 
    (nextval('public.seq_call_id'), 'Test voor nieuw', '2021-06-20 00:00:00+02', NULL, 1, '1000005', false, NULL, 1, 1, NULL, 1);


--
-- TOC entry 3159 (class 0 OID 40655)
-- Dependencies: 213
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.location (id, street, number, letter, postal, city, area, latitude, longitude, call_id) VALUES (1, 'Piratenweg', '2', NULL, '1234aa', 'Hoofddorp', '1', 1, 1, 1);
INSERT INTO public.location (id, street, number, letter, postal, city, area, latitude, longitude, call_id) VALUES (2, 'Hoofdweg', '299', NULL, '1999aa', 'Hoofddorp', '1', 1, 1, 2);
INSERT INTO public.location (id, street, number, letter, postal, city, area, latitude, longitude, call_id) VALUES (3, 'Stationstraat', '1', NULL, '1000aa', 'Hoofddorp', '1', 1, 1, 3);
INSERT INTO public.location (id, street, number, letter, postal, city, area, latitude, longitude, call_id) VALUES (4, 'Bomenlaan', '32', NULL, '2211aa', 'Hoofddorp', '1', 1, 1, 4);
INSERT INTO public.location (id, street, number, letter, postal, city, area, latitude, longitude, call_id) VALUES (5, 'Marktstraat', '44', NULL, '2911aa', 'Hoofddorp', '1', 1, 1, 5);
INSERT INTO public.location (id, street, number, letter, postal, city, area, latitude, longitude, call_id) VALUES (6, 'Piratenweg', '4', NULL, '1222aa', 'Hoofddorp', '1', 1, 1, 6);
