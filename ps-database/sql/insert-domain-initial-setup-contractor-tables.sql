\connect publicspace

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
INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Opdracht toewijzen', '/assign/${order.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'order.status.name', 'eq', 'Nieuwe opdracht');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Opdracht hertoewijzen', '/assign/${order.id}', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'order.status.name', 'neq', 'Nieuwe opdracht');


INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Opdracht maken', '/details/${order.id}/order/handle/select', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'order.status.name', 'eq', 'In behandeling');


-- ------------------------------
-- Pagina - Opdracht toewijzen
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('assign'), 'Opdracht toewijzen', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Toewijzen', '', get_action_type('Toewijzen persoon en groep'), 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);
INSERT INTO public.page_button_condition (id, page_button_id, field, operator, value) VALUES (nextval('public.seq_page_button_condition_id'), currval('public.seq_page_button_id'), 'tab', 'eq', 'user');

-- ------------------------------
-- Pagina - Selecteer bestekposten
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderSpecificationSelect'), 'Opdracht afhandelen - selecteren', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Volgende', '/details/${order.id}/order-specifications/handle', NULL, 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);

-- ------------------------------
-- Pagina - Bestekposten invullen
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderSpecificationHandle'), 'Opdracht afhandelen - invullen', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 0);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Controleren', '/details/${order.id}', get_action_type('Opdracht tijdelijk opslaan'), 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Controleren', '/details/${order.id}/order-specifications/confirmation', NULL, 1);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);

-- ------------------------------
-- Pagina - Bestekposten controleren
-- ------------------------------

INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderSpecificationConfirmation'), 'Opdracht afhandelen - controleren', 'page');

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 0);

INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Afhandelen', '', get_action_type('Opdracht gereedmelden'), 0);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_USER'), true);
INSERT INTO public.page_button_roles(id, page_button_id, role_id, allow) VALUES (nextval('public.seq_page_button_role_id'), currval('public.seq_page_button_id'), get_role('ROLE_ADMIN'), true);



-- ------------------------------
-- Pagina - Nieuwe melding - locatie
-- ------------------------------

-- INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newLocation'), 'Nieuwe opdracht - locatie', 'page');

-- INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
-- INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Volgende', '/new/information', get_action_type('Volgende'), 0);

-- ------------------------------
-- Nieuwe melding - informatie
-- ------------------------------

-- INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newInformation'), 'Nieuwe opdracht - informatie', 'page');

-- INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 0);
-- INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Controleer de melding', '/new/confirmation', get_action_type('Volgende'), 0);

-- ------------------------------
-- Nieuwe melding - controle
-- ------------------------------

-- INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('newConfirm'), 'Nieuwe opdracht - controlen', 'page');

-- INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Annuleren', '', get_action_type('Annuleren'), 0);
-- INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'left', get_page_button_type('containedSecondary'), 'Vorige', '', get_action_type('Terug'), 1);
-- INSERT INTO public.page_button (id, page_id, page_overview_id, location, button_type_id, name, route, action_type_id, sort) VALUES (nextval('public.seq_page_button_id'), currval('public.seq_page_id'), NULL, 'right', get_page_button_type('containedPrimary'), 'Melding maken', '', get_action_type('Melding aanmaken'), 0);

-- ------------------------------
-- Nieuwe opdracht maken
-- ------------------------------

-- INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderCreation'), 'Nieuwe opdracht maken', 'page');

-- ------------------------------
-- Nieuwe opdracht controleren
-- ------------------------------

-- INSERT INTO public.page (id, domain_id, page_type_id, name, layout_type) VALUES (nextval('public.seq_page_id'), get_last_id('public.seq_domain_id'), get_page_type('orderConfirm'), 'Nieuwe opdracht controleren', 'page');


-- ------------------------------
-- ------------------------------
-- ------------------------------
-- Voeg de acties toe
-- ------------------------------
-- ------------------------------
-- ------------------------------

INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Toewijzen persoon'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Toewijzen groep'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Toewijzen persoon en groep'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht aanmaken'), get_last_id('public.seq_domain_id'), get_status_by_name(get_last_id('public.seq_domain_id'), 'In behandeling'));
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht accepteren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht weigeren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Opdracht gereedmelden'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Terug'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Annuleren'), get_last_id('public.seq_domain_id'), NULL);
INSERT INTO public.action (id, action_type_id, domain_id, status_id) VALUES (nextval('public.seq_action_id'), get_action_type('Volgende'), get_last_id('public.seq_domain_id'), NULL);

