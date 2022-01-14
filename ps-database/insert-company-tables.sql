\connect publicspace

--
-- TOC entry 3145 (class 0 OID 16608)
-- Dependencies: 204
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.company (id, name, code, srid, center) VALUES (nextval('public.seq_company_id'), :comany_name, :comany_code, :comany_srid, :comany_center);
