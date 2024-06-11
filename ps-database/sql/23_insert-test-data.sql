\connect publicspace

-- -------------------------
-- -------------------------
-- Create Categorieen Government
-- -------------------------
-- -------------------------
INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Bouw en wonen', get_domain('Municipal Public Space'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Astbest', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Illegale bewoning', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Illegale bouw', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Sloop', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Strijdig gebruik', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group('Handhaving'));

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Groen en spelen', get_domain('Municipal Public Space'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Plansoen', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Gras', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Bomen', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Onkruid', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Berm', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Speelplaats', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Hek of bank', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Illegaal gebruik', '2021-01-01', NULL, true, get_group('Groenvoorziening'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group('Groenvoorziening'));

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Bestrating en verkeer', get_domain('Municipal Public Space'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Stoep', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Fietspad', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Weg of straat', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Paaltje', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Verkeersbord', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Drempel', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Belijning', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Gladheid', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Bushokje', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Parkeerplaats', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Onveilige situatie', '2021-01-01', NULL, true, get_group('Onderhoud'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group('Onderhoud'));

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Overlast', get_domain('Municipal Public Space'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Geluid', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Graffiti', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Vuurwerk', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Reclame', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Hondenpoep', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Fout Parkeren', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Horeca', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Jongeren', '2021-01-01', NULL, true, get_group('Handhaving'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group('Handhaving'));

-- -------------------------
-- Create contract
-- -------------------------
INSERT INTO public.contract (id, domain_id_governent, domain_id_contractor, accepted) VALUES (nextval('public.seq_contract_id'), get_domain('Municipal Public Space'), get_domain('Contractor Public Space'), true);

INSERT INTO contract_specification (id, contract_id, description, date_created, date_start, date_end, accepted, active) VALUES (nextval('public.seq_contract_specification'), currval('public.seq_contract_id'), 'Sample bestek', '2024-06-03 00:00:00.34+00', '2024-06-01', NULL, true, true);

INSERT INTO public.contract_specification_items (id, contract_specification_id, specification_number, name, unit, price, active) VALUES (nextval('public.seq_contract_specification_items'), currval('public.seq_contract_specification'), '100000', 'Bestekpost item 1', 'st', '12,00', true);
INSERT INTO public.contract_specification_items (id, contract_specification_id, specification_number, name, unit, price, active) VALUES (nextval('public.seq_contract_specification_items'), currval('public.seq_contract_specification'), '100001', 'Bestekpost item 2', 'm2', '100,00', true);

-- -------------------------
-- -------------------------
-- Create Categorieen Contractor
-- -------------------------
-- -------------------------

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Bestrating', get_domain('Contractor Public Space'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Lichtmasten', '2021-01-01', NULL, true, get_group('Water'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Berm', '2021-01-01', NULL, true, get_group('Water'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Verzakking', '2021-01-01', NULL, true, get_group('Water'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Gat in de weg', '2021-01-01', NULL, true, get_group('Water'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Verkeersborden', '2021-01-01', NULL, true, get_group('Water'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Drempel', '2021-01-01', NULL, true, get_group('Water'));

INSERT INTO public.contract_main_category (contract_id, main_category_id) VALUES (currval('public.seq_contract_id'), currval('public.seq_maincategory_id'))

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Overlast', get_domain('Contractor Public Space'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Geluid', '2021-01-01', NULL, true, get_group('Groen'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Graffiti', '2021-01-01', NULL, true, get_group('Groen'));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Vuurwerk', '2021-01-01', NULL, true, get_group('Groen'));

INSERT INTO public.contract_main_category (contract_id, main_category_id) VALUES (currval('public.seq_contract_id'), currval('public.seq_maincategory_id'))


