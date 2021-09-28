

SELECT 
   pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE
   pg_stat_activity.datname = 'publicspace'
AND pid <> pg_backend_pid();


--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-08-27 21:59:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS publicspace;
--
-- TOC entry 3176 (class 1262 OID 16574)
-- Name: publicspace; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE publicspace WITH TEMPLATE = template0 ENCODING = 'UTF8';


ALTER DATABASE publicspace OWNER TO postgres;

\connect publicspace

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 33325)
-- Name: action; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.action (
    id integer NOT NULL,
    action_type_id integer NOT NULL,
    domain_id integer NOT NULL,
    status_id integer
);


ALTER TABLE public.action OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33312)
-- Name: action_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.action_type (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.action_type OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16591)
-- Name: call; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.call (
    id integer NOT NULL,
    description text NOT NULL,
    date_created timestamp with time zone DEFAULT now() NOT NULL,
    date_ended timestamp with time zone,
    category_id integer NOT NULL,
    casenumber text NOT NULL,
    priority boolean DEFAULT false NOT NULL,
    notification text,
    company_id integer NOT NULL,
    status_id integer
);


ALTER TABLE public.call OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16600)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    main_category_id integer NOT NULL,
    name text NOT NULL,
    start_date date,
    end_date date,
    active boolean DEFAULT true,
    group_id integer NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16608)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.company OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16616)
-- Name: domain; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domain (
    id integer NOT NULL,
    company_id integer NOT NULL,
    domain text NOT NULL,
    domain_type integer
);


ALTER TABLE public.domain OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25098)
-- Name: domain_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domain_type (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.domain_type OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16842)
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name text NOT NULL,
    domain_id integer NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16624)
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    id integer NOT NULL,
    street text NOT NULL,
    number text,
    letter text,
    postal text,
    city text NOT NULL,
    area text,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    call_id integer NOT NULL
);


ALTER TABLE public.location OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16632)
-- Name: main_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.main_category (
    id integer NOT NULL,
    name text NOT NULL,
    company_id integer NOT NULL
);


ALTER TABLE public.main_category OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16575)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    street text,
    number text,
    letter text,
    postal text,
    city text,
    call_id integer NOT NULL
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16640)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name text NOT NULL,
    read boolean,
    write boolean
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33345)
-- Name: seq_action_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_action_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_action_id OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16770)
-- Name: seq_call_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_call_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_call_id OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16782)
-- Name: seq_casenumber_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_casenumber_id
    START WITH 1000000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_casenumber_id OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16821)
-- Name: seq_category_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_category_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_category_id OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16743)
-- Name: seq_company_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_company_id
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_company_id OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16746)
-- Name: seq_domain_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_domain_id
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_domain_id OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16855)
-- Name: seq_group_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_group_id
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_group_id OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16784)
-- Name: seq_location_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_location_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_location_id OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16819)
-- Name: seq_maincategory_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_maincategory_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_maincategory_id OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16793)
-- Name: seq_person_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_person_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_person_id OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16760)
-- Name: seq_session_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_session_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_session_id OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16815)
-- Name: seq_status_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_status_id
    START WITH 7
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_status_id OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16758)
-- Name: seq_user_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_user_id
    START WITH 2
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_user_id OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33345)
-- Name: seq_page_button_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_page_button_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_page_button_id OWNER TO postgres;


--
-- TOC entry 229 (class 1259 OID 33345)
-- Name: seq_page_button_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_page_button_role_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_page_button_role_id OWNER TO postgres;


--
-- TOC entry 229 (class 1259 OID 33345)
-- Name: seq_page_button_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_page_button_condition_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_page_button_condition_id OWNER TO postgres;


--
-- TOC entry 209 (class 1259 OID 16648)
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    id integer NOT NULL,
    api_key text NOT NULL,
    user_id integer NOT NULL,
    date_created timestamp without time zone NOT NULL,
    date_modified timestamp without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16802)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name text NOT NULL,
    domain_id integer NOT NULL,
    icon text,
    title text
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16857)
-- Name: user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_groups (
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.user_groups OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16656)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16583)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    domain_id integer NOT NULL,
    username text NOT NULL,
    password text,
    name text NOT NULL,
    email text NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    password_salt text,
    password_iteration_count integer,
    password_key_length integer,
    password_hash_function text
);

ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3149 (class 0 OID 16640)
-- Dependencies: 208
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'ROLE_USER', true, true);
INSERT INTO public.roles VALUES (2, 'ROLE_ADMIN', true, NULL);
INSERT INTO public.roles VALUES (3, 'ROLE_VIEWER', NULL, NULL);

--
-- TOC entry 3167 (class 0 OID 25098)
-- Dependencies: 226
-- Data for Name: domain_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.domain_type VALUES (1, 'Gemeente');
INSERT INTO public.domain_type VALUES (2, 'Aannemer');

--
-- TOC entry 3168 (class 0 OID 33312)
-- Dependencies: 227
-- Data for Name: action_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.action_type VALUES (0, 'Toewijzen persoon');
INSERT INTO public.action_type VALUES (1, 'Toewijzen groep');
INSERT INTO public.action_type VALUES (11, 'Opdracht annuleren');
INSERT INTO public.action_type VALUES (10, 'Opdracht afkeuren');
INSERT INTO public.action_type VALUES (9, 'Opdracht goedkeuren');
INSERT INTO public.action_type VALUES (8, 'Opdracht gereedmelden');
INSERT INTO public.action_type VALUES (7, 'Opdracht weigeren');
INSERT INTO public.action_type VALUES (6, 'Opdracht accepteren');
INSERT INTO public.action_type VALUES (5, 'Opdracht aanmaken');
INSERT INTO public.action_type VALUES (4, 'Melding afbreken');
INSERT INTO public.action_type VALUES (3, 'Melding afsluiten');
INSERT INTO public.action_type VALUES (2, 'Melding aanmaken');

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
-- TOC entry 3160 (class 0 OID 16802)
-- Dependencies: 219
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status VALUES (1, 'Nieuwe melding', 1, 'fiber_new', 'Nieuwe meldingen');
INSERT INTO public.status VALUES (2, 'In behandeling', 1, 'event', 'In behandelingen');
INSERT INTO public.status VALUES (3, 'Opdracht verstuurd naar aannemer', 1, 'watch_later', 'Opdracht verstuurd');
INSERT INTO public.status VALUES (4, 'Gereed gemeld', 1, 'done', 'Gereed gemeld');
INSERT INTO public.status VALUES (5, 'Afgesloten', 1, 'list_alt', 'Afgesloten meldingen');
INSERT INTO public.status VALUES (6, 'Afgebroken', 1, 'list_alt', 'Afgebroken meldingen');

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

--
-- TOC entry 2957 (class 2606 OID 16660)
-- Name: person Person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "Person_pkey" PRIMARY KEY (id);


--
-- TOC entry 2959 (class 2606 OID 16662)
-- Name: users User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2987 (class 2606 OID 33319)
-- Name: action_type action_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.action_type
    ADD CONSTRAINT action_pkey PRIMARY KEY (id);


--
-- TOC entry 2989 (class 2606 OID 33329)
-- Name: action action_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT action_pkey1 PRIMARY KEY (id);


--
-- TOC entry 2961 (class 2606 OID 16664)
-- Name: call call_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_pkey PRIMARY KEY (id);


--
-- TOC entry 2963 (class 2606 OID 16666)
-- Name: category category_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- TOC entry 2965 (class 2606 OID 16668)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- TOC entry 2967 (class 2606 OID 16670)
-- Name: domain domain_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain
    ADD CONSTRAINT domain_pkey PRIMARY KEY (id);


--
-- TOC entry 2985 (class 2606 OID 25105)
-- Name: domain_type domain_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain_type
    ADD CONSTRAINT domain_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2981 (class 2606 OID 16849)
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2969 (class 2606 OID 16672)
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- TOC entry 2971 (class 2606 OID 16674)
-- Name: main_category main_catergory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_category
    ADD CONSTRAINT main_catergory_pkey PRIMARY KEY (id);


--
-- TOC entry 2973 (class 2606 OID 16676)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2975 (class 2606 OID 16678)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- TOC entry 2979 (class 2606 OID 16809)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- TOC entry 2983 (class 2606 OID 16861)
-- Name: user_groups user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_pkey PRIMARY KEY (user_id, group_id);


--
-- TOC entry 2977 (class 2606 OID 16680)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 3008 (class 2606 OID 33330)
-- Name: action action_action_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT action_action_id_fk FOREIGN KEY (action_type_id) REFERENCES public.action_type(id) NOT VALID;


--
-- TOC entry 3009 (class 2606 OID 33335)
-- Name: action action_domain_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT action_domain_id_fk FOREIGN KEY (domain_id) REFERENCES public.domain(id) NOT VALID;


--
-- TOC entry 3010 (class 2606 OID 33340)
-- Name: action action_status_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT action_status_id_fk FOREIGN KEY (status_id) REFERENCES public.status(id) NOT VALID;


--
-- TOC entry 2992 (class 2606 OID 16683)
-- Name: call call_category_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_category_fk FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- TOC entry 2993 (class 2606 OID 16738)
-- Name: call call_comany_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_comany_fk FOREIGN KEY (company_id) REFERENCES public.company(id) NOT VALID;


--
-- TOC entry 2994 (class 2606 OID 16810)
-- Name: call call_status_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_status_fk FOREIGN KEY (status_id) REFERENCES public.status(id) NOT VALID;


--
-- TOC entry 2996 (class 2606 OID 16872)
-- Name: category category_group_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_group_fk FOREIGN KEY (id) REFERENCES public.groups(id) NOT VALID;


--
-- TOC entry 2995 (class 2606 OID 16698)
-- Name: category category_main_category_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_main_category_fk FOREIGN KEY (main_category_id) REFERENCES public.main_category(id) NOT VALID;


--
-- TOC entry 2997 (class 2606 OID 16703)
-- Name: domain domain_company_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain
    ADD CONSTRAINT domain_company_fk FOREIGN KEY (company_id) REFERENCES public.company(id) NOT VALID;


--
-- TOC entry 2998 (class 2606 OID 25106)
-- Name: domain domain_domain_type_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain
    ADD CONSTRAINT domain_domain_type_fk FOREIGN KEY (domain_type) REFERENCES public.domain_type(id) NOT VALID;


--
-- TOC entry 3005 (class 2606 OID 16850)
-- Name: groups group_domain_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT group_domain_fk FOREIGN KEY (domain_id) REFERENCES public.domain(id) NOT VALID;


--
-- TOC entry 3006 (class 2606 OID 16862)
-- Name: user_groups groups_group_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT groups_group_id_fk FOREIGN KEY (group_id) REFERENCES public.groups(id) NOT VALID;


--
-- TOC entry 3007 (class 2606 OID 16867)
-- Name: user_groups groups_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT groups_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- TOC entry 2999 (class 2606 OID 16772)
-- Name: location location_call_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_call_fk FOREIGN KEY (call_id) REFERENCES public.call(id) NOT VALID;


--
-- TOC entry 3000 (class 2606 OID 16765)
-- Name: main_category main_category_company_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_category
    ADD CONSTRAINT main_category_company_fk FOREIGN KEY (company_id) REFERENCES public.company(id) NOT VALID;


--
-- TOC entry 2990 (class 2606 OID 16777)
-- Name: person person_call_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_call_fk FOREIGN KEY (call_id) REFERENCES public.call(id) NOT VALID;


--
-- TOC entry 3002 (class 2606 OID 16708)
-- Name: user_roles roles_role_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT roles_role_id_fk FOREIGN KEY (role_id) REFERENCES public.roles(id) NOT VALID;


--
-- TOC entry 3003 (class 2606 OID 16713)
-- Name: user_roles roles_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT roles_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3004 (class 2606 OID 16883)
-- Name: status status_domain_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_domain_fk FOREIGN KEY (domain_id) REFERENCES public.domain(id) NOT VALID;


--
-- TOC entry 2991 (class 2606 OID 16718)
-- Name: users user_domain_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_domain_fk FOREIGN KEY (domain_id) REFERENCES public.domain(id) NOT VALID;


--
-- TOC entry 3001 (class 2606 OID 16723)
-- Name: session user_sessio_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT user_sessio_fk FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;





--
-- TOC entry 231 (class 1259 OID 24849)
-- Name: page_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_type (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.page_type OWNER TO postgres;

--
-- TOC entry 3139 (class 0 OID 24849)
-- Dependencies: 231
-- Data for Name: page_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page_type VALUES (1, 'overview');
INSERT INTO public.page_type VALUES (2, 'details');
INSERT INTO public.page_type VALUES (3, 'assign');


--
-- TOC entry 3008 (class 2606 OID 24856)
-- Name: page_type page_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_type
    ADD CONSTRAINT page_type_pkey PRIMARY KEY (id);


-- --------------------------------------


CREATE TABLE public.page (
    id integer NOT NULL,
    domain_id integer NOT NULL,
    page_type_id integer NOT NULL,
    name text NOT NULL
);

ALTER TABLE public.page
    OWNER to postgres;

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_domain_id_fk FOREIGN KEY (domain_id) REFERENCES public.domain (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_page_type_id_fk FOREIGN KEY (page_type_id)
        REFERENCES public.action_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

CREATE SEQUENCE public.seq_page_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_page_id
    OWNER TO postgres;

-- ---------------------------------

CREATE TABLE public.page_button (
    id integer NOT NULL,
    page_id integer NOT NULL,
    location text NOT NULL,
    button_type_id integer NOT NULL,
    name text NOT NULL,
    route text,
    action_type_id integer,
    sort integer NOT NULL
);

ALTER TABLE public.page_button
    OWNER to postgres;

ALTER TABLE ONLY public.page_button
    ADD CONSTRAINT page_buttons_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_button_action_type_id_fk FOREIGN KEY (action_type_id)
        REFERENCES public.action_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

ALTER TABLE ONLY public.page_button
    ADD CONSTRAINT page_button_type_button_type_id_fk FOREIGN KEY (button_type_id)
        REFERENCES public.page_button_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;


-- --------------------------------------


CREATE TABLE public.page_button_condition (
    id integer NOT NULL,
    page_button_id integer NOT NULL,
    field text NOT NULL,
    operator text NOT NULL,
    value text NOT NULL
);

ALTER TABLE public.page_button_condition
    OWNER to postgres;

ALTER TABLE ONLY public.page_button_condition
    ADD CONSTRAINT page_button_condition_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_button_condition
    ADD CONSTRAINT page_button_condition_id_fk FOREIGN KEY (page_button_id)
        REFERENCES public.page_button (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

-- --------------------------------------

CREATE TABLE public.page_button_roles
(
    id integer NOT NULL,
    page_button_id integer NOT NULL,
    role_id integer NOT NULL,
    allow boolean
);

ALTER TABLE public.page_button_roles
    OWNER to postgres;

ALTER TABLE ONLY public.page_button_roles
    ADD CONSTRAINT page_button_roles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_button_roles
    ADD CONSTRAINT page_button_roles_page_buttons_id_fk FOREIGN KEY (page_button_id)
        REFERENCES public.page_button (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

ALTER TABLE ONLY public.page_button_roles
    ADD CONSTRAINT page_button_roles_roles_id_fk FOREIGN KEY (role_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

-- ---------------------------------------

CREATE TABLE public.page_button_type (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.page_button_type OWNER TO postgres;

--
-- TOC entry 3139 (class 0 OID 33045)
-- Dependencies: 236
-- Data for Name: page_button_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.page_button_type VALUES (1, 'containedPrimary');
INSERT INTO public.page_button_type VALUES (2, 'containedSecondary');
INSERT INTO public.page_button_type VALUES (3, 'outlinePrimary');
INSERT INTO public.page_button_type VALUES (4, 'outlineSecondary');
INSERT INTO public.page_button_type VALUES (5, 'blank');


--
-- TOC entry 3008 (class 2606 OID 33052)
-- Name: page_button_type page_button_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_button_type
    ADD CONSTRAINT page_button_type_pkey PRIMARY KEY (id);


--
-- TOC entry 237 (class 1259 OID 33070)
-- Name: page_overview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_overview (
    id integer NOT NULL,
    page_id integer NOT NULL,
    name text NOT NULL,
    toggle boolean,
    route text,
    priority boolean,
    personal boolean,
    sort integer NOT NULL
);

ALTER TABLE public.page_overview OWNER TO postgres;

CREATE SEQUENCE public.seq_page_overview_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_page_overview_id
    OWNER TO postgres;

--
-- TOC entry 3140 (class 0 OID 33070)
-- Dependencies: 237
-- Data for Name: page_overview; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- TOC entry 3008 (class 2606 OID 33077)
-- Name: page_overview page_overview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_overview
    ADD CONSTRAINT page_overview_pkey PRIMARY KEY (id);


--
-- TOC entry 3009 (class 2606 OID 33078)
-- Name: page_overview page_overview_page_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_overview
    ADD CONSTRAINT page_overview_page_id_fk FOREIGN KEY (page_id) REFERENCES public.page(id);

--
-- TOC entry 237 (class 1259 OID 33070)
-- Name: page_overview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_overview_column (
    id integer NOT NULL,
    page_overview_id integer NOT NULL,
    name text NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    filter text NOT NULL,
    css text NOT NULL,
    mobile text NOT NULL,
    sort integer NOT NULL
);

ALTER TABLE public.page_overview_column OWNER TO postgres;

CREATE SEQUENCE public.seq_page_overview_column_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_page_overview_column_id
    OWNER TO postgres;



--
-- TOC entry 3008 (class 2606 OID 33077)
-- Name: page_overview page_overview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_overview_column
    ADD CONSTRAINT page_overview_column_pkey PRIMARY KEY (id);


--
-- TOC entry 3009 (class 2606 OID 33078)
-- Name: page_overview page_overview_page_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_overview_column
    ADD CONSTRAINT page_overview_column_page_overview_id_fk FOREIGN KEY (page_overview_id) REFERENCES public.page_overview(id);





--
-- TOC entry 244 (class 1259 OID 33106)
-- Name: page_overview_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_overview_status (
    id integer NOT NULL,
    page_overview_id integer NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.page_overview_status OWNER TO postgres;

--
-- TOC entry 3160 (class 0 OID 33106)
-- Dependencies: 244
-- Data for Name: page_overview_status; Type: TABLE DATA; Schema: public; Owner: postgres
--


--
-- TOC entry 3027 (class 2606 OID 33110)
-- Name: page_overview_status page_overview_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_overview_status
    ADD CONSTRAINT page_overview_status_pkey PRIMARY KEY (id);


--
-- TOC entry 3028 (class 2606 OID 33111)
-- Name: page_overview_status overview_status_page_overview_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_overview_status
    ADD CONSTRAINT overview_status_page_overview_id_fk FOREIGN KEY (page_overview_id) REFERENCES public.page(id);


--
-- TOC entry 3029 (class 2606 OID 33116)
-- Name: page_overview_status overview_status_status_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_overview_status
    ADD CONSTRAINT overview_status_status_id_fk FOREIGN KEY (status_id) REFERENCES public.status(id);



CREATE SEQUENCE public.seq_page_overview_column_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_page_overview_column_id
    OWNER TO postgres;


-- Completed on 2021-09-14 16:16:51 CEST

--
-- PostgreSQL database dump complete
--



