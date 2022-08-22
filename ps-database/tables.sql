INSERT INTO public.company (id, name, code, srid, center) VALUES
(nextval('public.seq_company_id'), 'Regio noord', 394, 28992, '010100002040710000EB65C4A11977F9400C3883DA1D2B1D41');


 --
-- TOC entry 3145 (class 0 OID 16608)
-- Dependencies: 204
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.domain (id, company_id, domain, name, domain_type) VALUES (nextval('public.seq_domain_id'), get_last_id('public.seq_company_id'), 'localhost', 'Gemeente 1', get_domain_type('Gemeente'));

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



INSERT INTO public.users (id, domain_id, username, password, name, email, admin, password_salt, password_iteration_count, password_key_length, password_hash_function)
VALUES (nextval('public.seq_user_id'), get_last_id('public.seq_domain_id'), 'admin', 'w8UIfTmAeL4r7L+B7HvVclCLdA7YiNPkvrSfHbYvKxVmh8ZKannY1cMICzYqKnq7DuyBSY4/htBzUvMqqQWOMA==', 'Administrator', 'fake@this-is-no-organisation.com', true, 'FcsezroM5VxfXaY3epjy', 1000, 512, 'PBKDF2WithHmacSHA1');

INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_ADMIN'));
INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_USER'));








-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de statussen toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

INSERT INTO public.status (id, name, domain_id) VALUES (nextval('public.seq_status_id'), 'Nieuwe melding', get_last_id('public.seq_domain_id'));
INSERT INTO public.status (id, name, domain_id) VALUES (nextval('public.seq_status_id'), 'In behandeling', get_last_id('public.seq_domain_id'));
INSERT INTO public.status (id, name, domain_id) VALUES (nextval('public.seq_status_id'), 'Afgesloten', get_last_id('public.seq_domain_id'));

-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de pagina's  toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

-- ------------------------------
-- Pagina - overzicht
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('overview'), 'Overzicht', 'page');

-- TAB: Nieuwe meldingen
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), currval('public.seq_page_id'), 'Nieuwe meldingen', 'fiber_new', true, 'details/${list.id}', 50, true, false, 0);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Nieuwe melding'));

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'left', get_page_button_type('containedPrimary'), 'Melding informatie', '/details/${list.id}', NULL, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'right', get_page_button_type('containedPrimary'), 'Melding toewijzen', '/assign/${list.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);

-- TAB: In behandeling
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), currval('public.seq_page_id'), 'In behandeling', 'event', false, 'details/${list.id}', 50, true, true, 1);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'left', get_page_button_type('containedPrimary'), 'Melding informatie', '/details/${list.id}', NULL, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'right', get_page_button_type('containedPrimary'), 'Opdracht maken', '/details/${list.id}/order/creation', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

-- TAB: Zoek een melding
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), currval('public.seq_page_id'), 'Zoek een melding', 'search', false, 'details/${list.id}', 50, false, false, 2);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Nieuwe melding'));
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Afgesloten'));


INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

-- ------------------------------
-- Pagina - Melding informatie
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('details'), 'Melding informatie', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Melding toewijzen', '/assign/${call.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'call.status.name', 'eq', 'Nieuwe melding');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Opdracht maken', '/details/${call.id}/order/creation', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'call.status.name', 'eq', 'In behandeling');


-- ------------------------------
-- Pagina - Melding toewijzen
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('assign'), 'Melding toewijzen', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Toewijzen persoon', '', get_action_type('Toewijzen persoon'), 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'tab', 'eq', 'user');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('outlinePrimary'), 'Toewijzen groep', '', get_action_type('Toewijzen groep'), 1);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'tab', 'eq', 'group');


-- ------------------------------
-- Pagina - Nieuwe melding - locatie
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newLocation'), 'Nieuwe melding - locatie', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Volgende', '/new/information', get_action_type('Volgende'), 0);

-- ------------------------------
-- Nieuwe melding - informatie
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newInformation'), 'Nieuwe melding - informatie', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Controleer de melding', '/new/confirmation', get_action_type('Volgende'), 0);

-- ------------------------------
-- Nieuwe melding - controle
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newConfirm'), 'Nieuwe melding - controle', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 1);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Melding maken', '', get_action_type('Melding aanmaken'), 0);

-- ------------------------------
-- Nieuwe opdracht maken
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderCreation'), 'Nieuwe opdracht maken', 'page');
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Opdracht controleren', '/details/${call.id}/order/confirmation', get_action_type('Volgende'), 0);
-- ------------------------------
-- Nieuwe opdracht controleren
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderConfirm'), 'Nieuwe opdracht controleren', 'page');
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 1);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Extra opdracht', '/details/${call.id}/order/creation', NULL, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Opslaan', '', get_action_type('Opdracht aanmaken'), 0);

-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de acties toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Toewijzen persoon'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Toewijzen groep'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Melding aanmaken'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Nieuwe melding'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Melding afsluiten'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Afgesloten'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Melding afbreken'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Afgesloten'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht aanmaken'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht goedkeuren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht afkeuren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht annuleren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Terug'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Annuleren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Volgende'), get_last_id('public.seq_domain_id'), NULL);










--
-- TOC entry 3145 (class 0 OID 16608)
-- Dependencies: 204
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.domain (id, company_id, domain, name, domain_type) VALUES (nextval('public.seq_domain_id'), get_last_id('public.seq_company_id'), '127.0.0.1', 'Aannemer 1', get_domain_type('Aannemer'));

-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de groepen toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

INSERT INTO public.groups (id, name, domain_id) VALUES (nextval('public.seq_group_id'), 'Wegen', currval('public.seq_domain_id'));
INSERT INTO public.groups (id, name, domain_id) VALUES (nextval('public.seq_group_id'), 'Groen', currval('public.seq_domain_id'));
INSERT INTO public.groups (id, name, domain_id) VALUES (nextval('public.seq_group_id'), 'Water', currval('public.seq_domain_id'));






INSERT INTO public.users (id, domain_id, username, password, name, email, admin, password_salt, password_iteration_count, password_key_length, password_hash_function)
VALUES (nextval('public.seq_user_id'), get_last_id('public.seq_domain_id'), 'admin', 'w8UIfTmAeL4r7L+B7HvVclCLdA7YiNPkvrSfHbYvKxVmh8ZKannY1cMICzYqKnq7DuyBSY4/htBzUvMqqQWOMA==', 'Administrator', 'fake@this-is-no-contr.organisation.com', true, 'FcsezroM5VxfXaY3epjy', 1000, 512, 'PBKDF2WithHmacSHA1');

INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_ADMIN'));
INSERT INTO public.user_roles (user_id, role_id) VALUES (get_last_id('public.seq_user_id'), get_role('ROLE_USER'));












-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de statussen toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

INSERT INTO public.status (id, name, domain_id) VALUES (nextval('public.seq_status_id'), 'Nieuwe opdracht', get_last_id('public.seq_domain_id'));
INSERT INTO public.status (id, name, domain_id) VALUES (nextval('public.seq_status_id'), 'In behandeling', get_last_id('public.seq_domain_id'));
INSERT INTO public.status (id, name, domain_id) VALUES (nextval('public.seq_status_id'), 'Afgesloten', get_last_id('public.seq_domain_id'));

-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de pagina's  toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

-- ------------------------------
-- Pagina - overzicht
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('overview'), 'Overzicht', 'page');

-- TAB: Nieuwe opdrachten
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), currval('public.seq_page_id'), 'Nieuwe opdracht', 'fiber_new', true, 'details/${list.id}', 50, true, false, 0);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Nieuwe opdracht'));

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'left', get_page_button_type('containedPrimary'), 'Opdracht informatie', '/details/${list.id}', NULL, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'right', get_page_button_type('containedPrimary'), 'Opdracht toewijzen', '/assign/${list.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);

-- TAB: In behandeling
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), currval('public.seq_page_id'), 'In behandeling', 'event', false, 'details/${list.id}', 50, true, true, 1);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'left', get_page_button_type('containedPrimary'), 'Opdracht informatie', '/details/${list.id}', NULL, 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), NULL, currval('public.seq_page_overview_id'), 'right', get_page_button_type('containedPrimary'), 'Opdracht maken', '/details/${list.id}/order/creation', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);

INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

-- TAB: Zoek een opdracht
INSERT INTO public.page_overview (id, page_id, name, icon, toggle, route, size, priority, personal, sort) VALUES (nextval('public.seq_page_overview_id'), currval('public.seq_page_id'), 'Zoek een opdracht', 'search', false, 'details/${list.id}', 50, false, false, 2);

INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Nieuwe opdracht'));
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.page_overview_status (id, page_overview_id, status_id) VALUES (nextval('public.seq_page_overview_status_id'), currval('public.seq_page_overview_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'Afgesloten'));


INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'category', 'Categorie', 'string', 'equals', 'col-sm-12 col-md-2 col-lg-2 bold', 'one', 0);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'location', 'Lokatie', 'string', '', 'col-sm-6 col-md-2 col-lg-2 italic', 'two', 1);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'casenumber', 'Id', 'string', '', 'col-sm-6 col-md-1 col-lg-1', 'three-a', 2);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'description', 'Omschrijving', 'text', '', 'col-sm-12 col-md-4 col-lg-4', '', 3);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'dateCreated', 'Datum', 'date', '', 'col-sm-6 col-md-2 col-lg-2', 'three-b', 4);
INSERT INTO public.page_overview_column (id, page_overview_id, name, title, type, filter, css, mobile, sort) VALUES (nextval('public.seq_page_overview_column_id'), currval('public.seq_page_overview_id'), 'area', 'Gebied', 'string', '', 'col-md-1 col-lg-1', '', 5);

-- ------------------------------
-- Pagina - Opdracht informatie
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('details'), 'Opdracht informatie', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Melding toewijzen', '/assign/${call.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'call.status.name', 'eq', 'Nieuwe opdracht');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Opdracht maken', '/details/${call.id}/order/creation', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'call.status.name', 'eq', 'In behandeling');


-- ------------------------------
-- Pagina - Opdracht toewijzen
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('assign'), 'Opdracht toewijzen', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Toewijzen persoon', '', get_action_type('Toewijzen persoon'), 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'tab', 'eq', 'user');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('outlinePrimary'), 'Toewijzen groep', '', get_action_type('Toewijzen groep'), 1);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'tab', 'eq', 'group');


-- ------------------------------
-- Pagina - Nieuwe melding - locatie
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newLocation'), 'Nieuwe opdracht - locatie', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Volgende', '/new/information', get_action_type('Volgende'), 0);

-- ------------------------------
-- Nieuwe melding - informatie
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newInformation'), 'Nieuwe opdracht - informatie', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Controleer de melding', '/new/confirmation', get_action_type('Volgende'), 0);

-- ------------------------------
-- Nieuwe melding - controle
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newConfirm'), 'Nieuwe opdracht - controle', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 1);
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Melding maken', '', get_action_type('Melding aanmaken'), 0);

-- ------------------------------
-- Nieuwe opdracht maken
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderCreation'), 'Nieuwe opdracht maken', 'page');

-- ------------------------------
-- Nieuwe opdracht controleren
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderConfirm'), 'Nieuwe opdracht controleren', 'page');


-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de acties toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Toewijzen persoon'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Toewijzen groep'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht aanmaken'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht accepteren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht weigeren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht gereedmelden'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Terug'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Annuleren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Volgende'), get_last_id('public.seq_domain_id'), NULL);

