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
INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (7, 1, 7, 'Nieuwe opdracht maken', 'page');
INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (8, 1, 8, 'Nieuwe opdracht controleren', 'page');


INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 2, NULL, 'left', 2, 'Vorige', '', 12, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 2, NULL, 'right', 1, 'Melding toewijzen', '/assign/${call.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 1, true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 2, true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'call.status.name', 'eq', 'Nieuwe melding');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 2, NULL, 'right', 1, 'Melding toewijzen', '/details/${call.id}/order/creation', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 1, true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 2, true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'call.status.name', 'eq', 'In behandeling');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 4, NULL, 'left', 2, 'Annuleren', '', 13, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 4, NULL, 'right', 1, 'Volgende', '/new/information', 14, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 5, NULL, 'right', 1, 'Controleer de melding', '/new/confirmation', 14, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 5, NULL, 'left', 2, 'Vorige', '', 12, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 6, NULL, 'left', 2, 'Annuleren', '', 13, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 6, NULL, 'left', 2, 'Vorige', '', 12, 1);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 6, NULL, 'right', 1, 'Melding maken', '', 2, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 3, NULL, 'left', 2, 'Annuleren', '', 13, 0);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 3, NULL, 'right', 1, 'Toewijzen persoon', '', 0, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 1, true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 2, true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'tab', 'eq', 'user');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), 3, NULL, 'right', 3, 'Toewijzen groep', '', 1, 1);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 1, true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 2, true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'tab', 'eq', 'group');




--
-- TOC entry 3159 (class 0 OID 37433)
-- Dependencies: 240
-- Data for Name: page_overview; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- TAB: Nieuwe meldingen
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), 1, 'Nieuwe meldingen', 'fiber_new', true, 'details/${calllist.id}', 50, true, false, 0);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (1, currval('public.seq_page_overview_id'), 1);

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'left', 1, 'Melding informatie', '/details/${calllist.id}', NULL, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'right', 1, 'Melding toewijzen', '/assign/${calllist.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 1, true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 2, true);

-- TAB: In behandeling
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), 1, 'In behandeling', 'event', false, 'details/${calllist.id}', 50, true, true, 1);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (2, currval('public.seq_page_overview_id'), 2);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'left', 1, 'Melding informatie', '/details/${calllist.id}', NULL, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'right', 1, 'Melding toewijzen', '/details/${calllist.id}/order/creation', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 1, true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), 2, true);

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

-- TAB: Zoek een melding
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), 1, 'Zoek een melding', 'search', false, 'details/${calllist.id}', 50, false, false, 2);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (3, currval('public.seq_page_overview_id'), 1);
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (4, currval('public.seq_page_overview_id'), 2);
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (5, currval('public.seq_page_overview_id'), 3);


INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);


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