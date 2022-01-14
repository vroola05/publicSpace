\connect publicspace

-- -------------------------
-- Create contract
-- -------------------------
INSERT INTO public.contract(id, domain_id_governent, domain_id_contractor, accepted) VALUES (nextval('public.seq_contract_id'), get_domain(:domain_name), get_domain(:domain_name_contr), false);

-- -------------------------
-- -------------------------
-- Create Categorieen Government
-- -------------------------
-- -------------------------
INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Bouw en wonen', get_domain(:domain_name));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Astbest', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Illegale bewoning', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Illegale bouw', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Sloop', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Strijdig gebruik', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group(:domain_group_name2));

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Groen en spelen', get_domain(:domain_name));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Plansoen', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Gras', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Bomen', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Onkruid', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Berm', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Speelplaats', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Hek of bank', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Illegaal gebruik', '2021-01-01', NULL, true, get_group(:domain_group_name1));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group(:domain_group_name1));

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Bestrating en verkeer', get_domain(:domain_name));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Stoep', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Fietspad', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Weg of straat', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Paaltje', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Verkeersbord', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Drempel', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Belijning', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Gladheid', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Bushokje', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Parkeerplaats', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Onveilige situatie', '2021-01-01', NULL, true, get_group(:domain_group_name3));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group(:domain_group_name3));

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Overlast', get_domain(:domain_name));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Geluid', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Graffiti', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Vuurwerk', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Reclame', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Hondenpoep', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Fout Parkeren', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Horeca', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Jongeren', '2021-01-01', NULL, true, get_group(:domain_group_name2));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Overige', '2021-01-01', NULL, true, get_group(:domain_group_name2));

-- -------------------------
-- -------------------------
-- Create Categorieen Contractor
-- -------------------------
-- -------------------------

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Bestrating', get_domain(:domain_name_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Lichtmasten', '2021-01-01', NULL, true, get_group(:domain_group_name3_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Berm', '2021-01-01', NULL, true, get_group(:domain_group_name3_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Verzakking', '2021-01-01', NULL, true, get_group(:domain_group_name3_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Gat in de weg', '2021-01-01', NULL, true, get_group(:domain_group_name3_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Verkeersborden', '2021-01-01', NULL, true, get_group(:domain_group_name3_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Drempel', '2021-01-01', NULL, true, get_group(:domain_group_name3_contr));

INSERT INTO public.main_category (id, name, domain_id) VALUES (nextval('public.seq_maincategory_id'), 'Overlast', get_domain(:domain_name_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Geluid', '2021-01-01', NULL, true, get_group(:domain_group_name2_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Graffiti', '2021-01-01', NULL, true, get_group(:domain_group_name2_contr));
INSERT INTO public.category (id, main_category_id, name, start_date, end_date, active, group_id) VALUES (nextval('public.seq_category_id'), currval('public.seq_maincategory_id'), 'Vuurwerk', '2021-01-01', NULL, true, get_group(:domain_group_name2_contr));
