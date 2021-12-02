
\connect publicspace

--
-- TOC entry 237 (class 1259 OID 33070)
-- Name: page_button; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_overview_button (
    id integer NOT NULL,
    page_overview_id integer NOT NULL,
    location text NOT NULL,
    button_type_id integer NOT NULL,
    name text NOT NULL,
    route text,
    action_type_id integer,
    sort integer NOT NULL
);

ALTER TABLE public.page_overview_button
    OWNER to postgres;

ALTER TABLE ONLY public.page_overview_button
    ADD CONSTRAINT page_overview_buttons_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_overview_button
    ADD CONSTRAINT page_overview_button_action_type_id_fk FOREIGN KEY (action_type_id)
        REFERENCES public.action_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

ALTER TABLE ONLY public.page_overview_button
    ADD CONSTRAINT page_overview_button_type_button_type_id_fk FOREIGN KEY (button_type_id)
        REFERENCES public.page_button_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;


-- --------------------------------------

CREATE TABLE public.page_overview_button_condition (
    id integer NOT NULL,
    page_overview_button_id integer NOT NULL,
    field text NOT NULL,
    operator text NOT NULL,
    value text NOT NULL
);

ALTER TABLE public.page_overview_button_condition
    OWNER to postgres;

ALTER TABLE ONLY public.page_overview_button_condition
    ADD CONSTRAINT page_overview_button_condition_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_overview_button_condition
    ADD CONSTRAINT page_overview_button_condition_id_fk FOREIGN KEY (page_overview_button_id)
        REFERENCES public.page_overview_button (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

-- --------------------------------------

CREATE TABLE public.page_overview_button_roles
(
    id integer NOT NULL,
    page_overview_button_id integer NOT NULL,
    role_id integer NOT NULL,
    allow boolean
);

ALTER TABLE public.page_overview_button_roles
    OWNER to postgres;

ALTER TABLE ONLY public.page_overview_button_roles
    ADD CONSTRAINT page_overview_button_roles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.page_overview_button_roles
    ADD CONSTRAINT page_overview_button_roles_page_buttons_id_fk FOREIGN KEY (page_overview_button_id)
        REFERENCES public.page_overview_button (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

ALTER TABLE ONLY public.page_overview_button_roles
    ADD CONSTRAINT page_overview_button_roles_roles_id_fk FOREIGN KEY (role_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;
