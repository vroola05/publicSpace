\connect publicspace

--
-- TOC entry 3145 (class 0 OID 16608)
-- Dependencies: 204
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.company (id, name, code, srid, center) VALUES (nextval('public.seq_company_id'), 'System Admin', 394, 28992, '010100002040710000EB65C4A11977F9400C3883DA1D2B1D41');

INSERT INTO public.domain VALUES (nextval('public.seq_domain_id'), currval('public.seq_company_id'), 'localhost', 'Gemeente 1', 1);

INSERT INTO public.groups VALUES (nextval('public.seq_group_id'), 'Beheerder', currval('public.seq_domain_id'));

INSERT INTO public.users VALUES (nextval('public.seq_user_id'), currval('public.seq_domain_id'), 'admin', 'u7J6I+gpok5RuD7faTL8Bj0D5MyIF4/fRHLXver+aieI46fIepGEp8Z5qOBFj4z2sNvMY+U/X3VKsKdkux6X3Q==', 'Administrator', 'fake@this-is-no-organisation.com', true, 'kCPK1vNqTSFoo79Djocy', 1000, 512, 'PBKDF2WithHmacSHA1');

INSERT INTO public.user_groups VALUES (currval('public.seq_user_id'), currval('public.seq_group_id'));

INSERT INTO public.user_roles VALUES (currval('public.seq_user_id'), 1);
INSERT INTO public.user_roles VALUES (currval('public.seq_user_id'), 2);

INSERT INTO public.domain VALUES (nextval('public.seq_domain_id'), currval('public.seq_company_id'), '127.0.0.1', 'Aannemer 1', 2);

INSERT INTO public.groups VALUES (nextval('public.seq_group_id'), 'Wegen', currval('public.seq_domain_id'));

INSERT INTO public.users VALUES (nextval('public.seq_user_id'), currval('public.seq_domain_id'), 'admin', 'u7J6I+gpok5RuD7faTL8Bj0D5MyIF4/fRHLXver+aieI46fIepGEp8Z5qOBFj4z2sNvMY+U/X3VKsKdkux6X3Q==', 'Administrator', 'fake1@this-is-no-organisation.com', true, 'kCPK1vNqTSFoo79Djocy', 1000, 512, 'PBKDF2WithHmacSHA1');

INSERT INTO public.user_groups VALUES (currval('public.seq_user_id'), currval('public.seq_group_id'));

INSERT INTO public.user_roles VALUES (currval('public.seq_user_id'), 1);
INSERT INTO public.user_roles VALUES (currval('public.seq_user_id'), 2);


INSERT INTO public.contract(id, domain_id_governent, domain_id_contractor, accepted) VALUES (nextval('public.seq_contract_id'), 1, 2, true);