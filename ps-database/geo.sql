
\connect publicspace


--
-- TOC entry 246 (class 1259 OID 17621)
-- Name: geo_address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.geo_address (
    id integer NOT NULL,
    type text NOT NULL,
    start_date date,
    end_date date,
    active boolean,
    government integer,
    district text,
    street text NOT NULL,
    number integer,
    letter text, 
    addition text, 
    postal text,
    city text NOT NULL,
    xcoord integer,
    ycoord integer,
    coord integer NOT NULL,
    geo geometry NOT NULL
);

ALTER TABLE public.geo_address OWNER TO postgres;

ALTER TABLE ONLY public.geo_address
    ADD CONSTRAINT geo_object_pkey PRIMARY KEY (id);


CREATE SEQUENCE public.seq_geo_address
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_geo_address OWNER TO postgres;

-- Completed on 2021-09-14 16:16:51 CEST
--
-- PostgreSQL database dump complete
--



