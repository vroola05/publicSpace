
\connect publicspace


--
-- TOC entry 226 (class 1259 OID 25098)
-- Name: domain_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domain_type (
    id integer NOT NULL,
    name text NOT NULL
);

ALTER TABLE public.domain_type OWNER TO postgres;

ALTER TABLE ONLY public.domain_type
    ADD CONSTRAINT domain_type_pkey PRIMARY KEY (id);

--
-- TOC entry 227 (class 1259 OID 33312)
-- Name: action_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.action_type (
    id integer NOT NULL,
    name text NOT NULL,
    domain_type integer
);

ALTER TABLE public.action_type OWNER TO postgres;

ALTER TABLE ONLY public.action_type
    ADD CONSTRAINT action_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.action_type
    ADD CONSTRAINT action_type_domain_type_fk FOREIGN KEY (domain_type) REFERENCES public.domain_type(id) NOT VALID;



--
-- TOC entry 204 (class 1259 OID 16608)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name text NOT NULL,
    code integer NOT NULL,
    srid integer NOT NULL,
    center geometry NOT NULL
);

ALTER TABLE public.company OWNER TO postgres;

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);

--
-- TOC entry 205 (class 1259 OID 16616)
-- Name: domain; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domain (
    id integer NOT NULL,
    company_id integer NOT NULL,
    domain text NOT NULL,
    name text NOT NULL,
    domain_type integer
);


ALTER TABLE public.domain OWNER TO postgres;

ALTER TABLE ONLY public.domain
    ADD CONSTRAINT domain_pkey PRIMARY KEY (id);



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
-- TOC entry 223 (class 1259 OID 16842)
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name text NOT NULL,
    domain_id integer NOT NULL
);

ALTER TABLE public.groups OWNER TO postgres;

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);

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

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_domain_fk FOREIGN KEY (domain_id) REFERENCES public.domain(id) NOT VALID;

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
-- TOC entry 225 (class 1259 OID 16857)
-- Name: user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_groups (
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.user_groups OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16802)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name text NOT NULL,
    domain_id integer NOT NULL
);

ALTER TABLE public.status OWNER TO postgres;

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_domain_fk FOREIGN KEY (domain_id) REFERENCES public.domain(id) NOT VALID;


--
-- TOC entry 207 (class 1259 OID 16632)
-- Name: main_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.main_category (
    id integer NOT NULL,
    name text NOT NULL,
    domain_id integer NOT NULL
);

ALTER TABLE public.main_category OWNER TO postgres;

ALTER TABLE ONLY public.main_category
    ADD CONSTRAINT main_catergory_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.main_category
    ADD CONSTRAINT main_category_domain_fk FOREIGN KEY (domain_id) REFERENCES public.domain(id) NOT VALID;

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

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_group_fk FOREIGN KEY (group_id) REFERENCES public.groups(id) NOT VALID;

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_main_category_fk FOREIGN KEY (main_category_id) REFERENCES public.main_category(id) NOT VALID;


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
    status_id integer,
    user_id integer,
    group_id integer
);


ALTER TABLE public.call OWNER TO postgres;

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_category_fk FOREIGN KEY (category_id) REFERENCES public.category(id);

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_comany_fk FOREIGN KEY (company_id) REFERENCES public.company(id) NOT VALID;

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_status_fk FOREIGN KEY (status_id) REFERENCES public.status(id) NOT VALID;

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;

ALTER TABLE ONLY public.call
    ADD CONSTRAINT call_group_fk FOREIGN KEY (group_id) REFERENCES public.groups(id) NOT VALID;

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
    x double precision NOT NULL,
    y double precision NOT NULL,
    call_id integer NOT NULL
);


ALTER TABLE public.location OWNER TO postgres;

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
    START WITH 1
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
    START WITH 1
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
    START WITH 1
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
    START WITH 1
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
-- TOC entry 2957 (class 2606 OID 16660)
-- Name: person Person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "Person_pkey" PRIMARY KEY (id);



--
-- TOC entry 2989 (class 2606 OID 33329)
-- Name: action action_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.action
    ADD CONSTRAINT action_pkey1 PRIMARY KEY (id);




--
-- TOC entry 2969 (class 2606 OID 16672)
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


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
    name text NOT NULL,
    layout_type text NOT NULL
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


--
-- TOC entry 237 (class 1259 OID 33070)
-- Name: page_button_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_button_type (
    id integer NOT NULL,
    name text
);

ALTER TABLE public.page_button_type OWNER TO postgres;

ALTER TABLE ONLY public.page_button_type
    ADD CONSTRAINT page_button_type_pkey PRIMARY KEY (id);

--
-- TOC entry 237 (class 1259 OID 33070)
-- Name: page_button; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_button (
    id integer NOT NULL,
    page_id integer,
    page_overview_id integer,
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

ALTER TABLE ONLY public.page_button
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

--
-- TOC entry 237 (class 1259 OID 33070)
-- Name: page_overview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_overview (
    id integer NOT NULL,
    page_id integer NOT NULL,
    name text NOT NULL,
    icon text NOT NULL,
    toggle boolean,
    size integer NOT NULL,
    route text,
    priority boolean,
    personal boolean,
    sort integer NOT NULL
);

ALTER TABLE public.page_overview OWNER TO postgres;

ALTER TABLE ONLY public.page_overview
    ADD CONSTRAINT page_overview_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_overview
    ADD CONSTRAINT page_overview_page_id_fk FOREIGN KEY (page_id) REFERENCES public.page(id);

CREATE SEQUENCE public.seq_page_overview_id
    INCREMENT 1
    START 4
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_page_overview_id
    OWNER TO postgres;

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

ALTER TABLE ONLY public.page_overview_column
    ADD CONSTRAINT page_overview_column_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_overview_column
    ADD CONSTRAINT page_overview_column_page_overview_id_fk FOREIGN KEY (page_overview_id) REFERENCES public.page_overview(id);

CREATE SEQUENCE public.seq_page_overview_column_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_page_overview_column_id
    OWNER TO postgres;

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

ALTER TABLE ONLY public.page_overview_status
    ADD CONSTRAINT page_overview_status_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_overview_status
    ADD CONSTRAINT overview_status_page_overview_id_fk FOREIGN KEY (page_overview_id) REFERENCES public.page_overview(id);

ALTER TABLE ONLY public.page_overview_status
    ADD CONSTRAINT overview_status_status_id_fk FOREIGN KEY (status_id) REFERENCES public.status(id);

CREATE SEQUENCE public.seq_page_overview_status_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_page_overview_status_id
    OWNER TO postgres;


--
-- TOC entry 256 (class 1259 OID 41088)
-- Name: contract; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contract (
    id integer NOT NULL,
    domain_id_governent integer NOT NULL,
    domain_id_contractor integer NOT NULL,
    date_created timestamp with time zone DEFAULT now() NOT NULL,
    accepted boolean
);

ALTER TABLE public.contract OWNER TO postgres;

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT contract_id_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT contract_domain_contr_fk FOREIGN KEY (domain_id_contractor) REFERENCES public.domain(id) NOT VALID;

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT contract_domain_gov_fk FOREIGN KEY (domain_id_governent) REFERENCES public.domain(id);

CREATE SEQUENCE public.seq_contract_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_contract_id
    OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 41088)
-- Name: contract_main_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contract_main_category (
    contract_id integer NOT NULL,
    main_category_id integer NOT NULL
);


ALTER TABLE public.contract_main_category OWNER TO postgres;

ALTER TABLE ONLY public.contract_main_category
    ADD CONSTRAINT contract_main_category_pkey PRIMARY KEY (contract_id,main_category_id);

ALTER TABLE ONLY public.contract_main_category
    ADD CONSTRAINT contract_main_category_contract_id FOREIGN KEY (contract_id) REFERENCES public.contract(id) NOT VALID;

ALTER TABLE ONLY public.contract_main_category
    ADD CONSTRAINT contract_main_category_main_category_id FOREIGN KEY (main_category_id) REFERENCES public.main_category(id) NOT VALID;

CREATE SEQUENCE public.seq_contract_main_category_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_contract_main_category_id
    OWNER TO postgres;


--
-- TOC entry 267 (class 1259 OID 86799)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    call_id integer NOT NULL,
    domain_id integer NOT NULL,
    date_created timestamp with time zone DEFAULT now() NOT NULL,
    date_ended timestamp with time zone,
    description text NOT NULL,
    status_id integer NOT NULL,
    user_id integer,
    group_id integer NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_call_fk FOREIGN KEY (call_id) REFERENCES public.call(id) NOT VALID;

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_status_fk FOREIGN KEY (status_id) REFERENCES public.status(id) NOT VALID;

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_group_fk FOREIGN KEY (group_id) REFERENCES public.groups(id) NOT VALID;

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_user_fk FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;

CREATE SEQUENCE public.seq_order_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_order_id
    OWNER TO postgres;

--
-- TOC entry 267 (class 1259 OID 86799)
-- Name: orders_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_category (
    id integer NOT NULL,
    order_id integer,
    category_id integer
);

ALTER TABLE public.orders_category OWNER TO postgres;

ALTER TABLE ONLY public.orders_category
    ADD CONSTRAINT orders_category_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.orders_category
    ADD CONSTRAINT orders_category_category_fk FOREIGN KEY (category_id) REFERENCES public.category(id);

ALTER TABLE ONLY public.orders_category
    ADD CONSTRAINT orders_category_order_fk FOREIGN KEY (order_id) REFERENCES public.orders(id);

CREATE SEQUENCE public.seq_orders_category_id
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.seq_orders_category_id
    OWNER TO postgres;