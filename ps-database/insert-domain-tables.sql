\connect publicspace

--
-- TOC entry 3145 (class 0 OID 16608)
-- Dependencies: 204
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.company VALUES (1, 'System Admin');

--
-- TOC entry 3146 (class 0 OID 16616)
-- Dependencies: 205
-- Data for Name: domain; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.domain VALUES (1, 1, 'localhost', 1);

--
-- TOC entry 3164 (class 0 OID 16842)
-- Dependencies: 223
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.groups VALUES (1, 'Beheerder', 1);

--
-- TOC entry 3142 (class 0 OID 16583)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 1, 'admin', 'u7J6I+gpok5RuD7faTL8Bj0D5MyIF4/fRHLXver+aieI46fIepGEp8Z5qOBFj4z2sNvMY+U/X3VKsKdkux6X3Q==', 'Administrator', 'fake@this-is-no-organisation.com', true, 'kCPK1vNqTSFoo79Djocy', 1000, 512, 'PBKDF2WithHmacSHA1');

--
-- TOC entry 3166 (class 0 OID 16857)
-- Dependencies: 225
-- Data for Name: user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_groups VALUES (1, 1);

--
-- TOC entry 3151 (class 0 OID 16656)
-- Dependencies: 210
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles VALUES (1, 1);
INSERT INTO public.user_roles VALUES (1, 2);
