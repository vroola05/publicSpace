\connect publicspace

--
-- TOC entry 3160 (class 0 OID 16802)
-- Dependencies: 219
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status VALUES (1, 'Nieuwe melding', 1);
INSERT INTO public.status VALUES (2, 'In behandeling', 1);
INSERT INTO public.status VALUES (3, 'Afgesloten', 1);

--
-- TOC entry 3149 (class 0 OID 16640)
-- Dependencies: 208
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (1, 1, 1, 'Overzicht', 'page');
INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (2, 1, 2, 'Melding informatie', 'page');
INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (3, 1, 3, 'Melding toewijzen', 'page');
INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (4, 1, 4, 'Nieuwe melding - locatie', 'page');
INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (5, 1, 5, 'Nieuwe melding - informatie', 'page');
INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (6, 1, 6, 'Nieuwe melding - controle', 'page');


INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (1, 2, 'left', 2, 'Vorige', '', 12, 0);
INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (2, 4, 'left', 2, 'Annuleren', '', 13, 0);
INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (3, 4, 'right', 1, 'Volgende', '/new/information', 14, 0);
INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (4, 5, 'right', 1, 'Controleer de melding', '/new/confirmation', 14, 0);
INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (5, 5, 'left', 2, 'Vorige', '', 12, 0);
INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (6, 6, 'left', 2, 'Annuleren', '', 13, 0);
INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (7, 6, 'left', 2, 'Vorige', '', 12, 1);
INSERT INTO public.page_button (id, page_id, location, button_type_id, name, route, action_type_id, sort) VALUES (8, 6, 'right', 1, 'Melding maken', '', 2, 0);

--
-- TOC entry 3159 (class 0 OID 37433)
-- Dependencies: 240
-- Data for Name: page_overview; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (1, 1, 'Nieuwe meldingen', 'fiber_new', true, 'details/${calllist.id}', 50, true, false, 0);
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (2, 1, 'In behandeling', 'event', false, 'details/${calllist.id}', 50, true, true, 1);
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (3, 1, 'Zoek een melding', 'search', false, 'details/${calllist.id}', 50, false, false, 2);

--
-- TOC entry 3160 (class 0 OID 37463)
-- Dependencies: 244
-- Data for Name: page_overview_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (1, 1, 1);
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (2, 2, 2);
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (3, 3, 1);
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (4, 3, 2);
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (5, 3, 3);


--
-- TOC entry 3159 (class 0 OID 37448)
-- Dependencies: 242
-- Data for Name: page_overview_column; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 1, 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 1, 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 1, 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 1, 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 1, 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 1, 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 2, 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 2, 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 2, 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 2, 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 2, 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 2, 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 3, 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 3, 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 3, 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 3, 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 3, 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), 3, 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);


--
-- TOC entry 3159 (class 0 OID 37448)
-- Dependencies: 242
-- Data for Name: action; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (2, 1, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (7, 6, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (8, 7, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (9, 8, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (10, 9, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (11, 10, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (12, 11, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (13, 12, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (14, 13, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (15, 14, 1, NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (3, 2, 1, 1);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (5, 4, 1, 3);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (4, 3, 1, 3);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (1, 0, 1, 2);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (6, 5, 1, 2);