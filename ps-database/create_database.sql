

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
