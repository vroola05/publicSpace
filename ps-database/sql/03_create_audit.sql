\connect publicspace

CREATE SCHEMA IF NOT EXISTS audit;

CREATE SEQUENCE public.hibernate_sequence
    INCREMENT 1
    START 1
    MINVALUE 0
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE audit.revinfo (
    rev integer,
    revtstmp bigint
);

ALTER TABLE audit.revinfo OWNER TO postgres;

ALTER TABLE ONLY audit.revinfo
    ADD CONSTRAINT revinfo_rev_pk PRIMARY KEY (rev);

-- Main Category
CREATE TABLE audit.main_category_aud (
    id integer NOT NULL,
    name text,
    domain_id integer,
    rev integer NOT NULL,
    revtype integer NOT NULL
);

ALTER TABLE audit.main_category_aud OWNER TO postgres;

ALTER TABLE ONLY audit.main_category_aud
    ADD CONSTRAINT main_catergory_aud_pkey PRIMARY KEY (id, rev);

-- Category
CREATE TABLE audit.category_aud (
    id integer NOT NULL,
    main_category_id integer,
    name text,
    start_date date,
    end_date date,
    active boolean,
    group_id integer,
    rev integer NOT NULL,
    revtype integer NOT NULL
);

ALTER TABLE audit.category_aud OWNER TO postgres;

ALTER TABLE ONLY audit.category_aud
    ADD CONSTRAINT category_aud_pk PRIMARY KEY (id, rev);

-- Contract

CREATE TABLE audit.contract_aud (
    id integer NOT NULL,
    domain_id_governent integer,
    domain_id_contractor integer,
    date_created timestamp with time zone,
    accepted boolean,
    rev integer NOT NULL,
    revtype integer NOT NULL
);

ALTER TABLE audit.contract_aud OWNER TO postgres;

ALTER TABLE ONLY audit.contract_aud
    ADD CONSTRAINT contract_aud_id_pk PRIMARY KEY (id, rev);

-- Contract main categories
CREATE TABLE audit.contract_main_category_aud (
    contract_id integer NOT NULL,
    main_category_id integer,
    rev integer NOT NULL,
    revtype integer NOT NULL
);

ALTER TABLE audit.contract_main_category_aud OWNER TO postgres;

ALTER TABLE ONLY audit.contract_main_category_aud
    ADD CONSTRAINT contract_main_category_aud_pkey PRIMARY KEY (contract_id, main_category_id, rev);

-- Contract specification

CREATE TABLE audit.contract_specification_aud (
    id integer NOT NULL,
    contract_id integer,
    description text,
    date_created timestamp with time zone DEFAULT now(),
    date_start date,
    date_end date,
    accepted boolean,
    active boolean,
    rev integer NOT NULL,
    revtype integer NOT NULL
);

ALTER TABLE audit.contract_specification_aud OWNER TO postgres;

ALTER TABLE ONLY audit.contract_specification_aud
    ADD CONSTRAINT contract_specification_aud_pk PRIMARY KEY (id, rev);

-- Contract specification items

CREATE TABLE audit.contract_specification_items_aud (
    id integer NOT NULL,
    contract_specification_id integer,
    specification_number text,
    name text,
    unit text,
    price text,
    active boolean,
    rev integer NOT NULL,
    revtype integer NOT NULL
);

ALTER TABLE audit.contract_specification_items_aud OWNER TO postgres;

ALTER TABLE ONLY audit.contract_specification_items_aud
    ADD CONSTRAINT contract_specification_items_aud_pk PRIMARY KEY (id, rev);


-- Groups
CREATE TABLE audit.groups_aud (
    id integer NOT NULL,
    name text,
    domain_id integer,
    rev integer NOT NULL,
    revtype integer NOT NULL
);

ALTER TABLE audit.groups_aud OWNER TO postgres;

ALTER TABLE ONLY audit.groups_aud
    ADD CONSTRAINT groups_aud_pkey PRIMARY KEY (id, rev);