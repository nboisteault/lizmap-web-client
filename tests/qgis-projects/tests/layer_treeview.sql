--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10 (Debian 11.10-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Ubuntu 13.2-1.pgdg18.04+1)

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

--
-- Name: layer_mut_1; Type: TABLE; Schema: tests_projects; Owner: lizmap
--

CREATE TABLE tests_projects.layer_mut_1 (
    id integer NOT NULL,
    geom public.geometry(Point,2154)
);


ALTER TABLE tests_projects.layer_mut_1 OWNER TO lizmap;

--
-- Name: layer_mut_1_id_seq; Type: SEQUENCE; Schema: tests_projects; Owner: lizmap
--

CREATE SEQUENCE tests_projects.layer_mut_1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tests_projects.layer_mut_1_id_seq OWNER TO lizmap;

--
-- Name: layer_mut_1_id_seq; Type: SEQUENCE OWNED BY; Schema: tests_projects; Owner: lizmap
--

ALTER SEQUENCE tests_projects.layer_mut_1_id_seq OWNED BY tests_projects.layer_mut_1.id;


--
-- Name: layer_mut_2; Type: TABLE; Schema: tests_projects; Owner: lizmap
--

CREATE TABLE tests_projects.layer_mut_2 (
    id integer NOT NULL,
    geom public.geometry(Point,2154)
);


ALTER TABLE tests_projects.layer_mut_2 OWNER TO lizmap;

--
-- Name: layer_mut_2_id_seq; Type: SEQUENCE; Schema: tests_projects; Owner: lizmap
--

CREATE SEQUENCE tests_projects.layer_mut_2_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tests_projects.layer_mut_2_id_seq OWNER TO lizmap;

--
-- Name: layer_mut_2_id_seq; Type: SEQUENCE OWNED BY; Schema: tests_projects; Owner: lizmap
--

ALTER SEQUENCE tests_projects.layer_mut_2_id_seq OWNED BY tests_projects.layer_mut_2.id;


--
-- Name: layer_treeview; Type: TABLE; Schema: tests_projects; Owner: lizmap
--

CREATE TABLE tests_projects.layer_treeview (
    id integer NOT NULL,
    geom public.geometry(Point,2154)
);


ALTER TABLE tests_projects.layer_treeview OWNER TO lizmap;

--
-- Name: layer_treeview_id_seq; Type: SEQUENCE; Schema: tests_projects; Owner: lizmap
--

CREATE SEQUENCE tests_projects.layer_treeview_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tests_projects.layer_treeview_id_seq OWNER TO lizmap;

--
-- Name: layer_treeview_id_seq; Type: SEQUENCE OWNED BY; Schema: tests_projects; Owner: lizmap
--

ALTER SEQUENCE tests_projects.layer_treeview_id_seq OWNED BY tests_projects.layer_treeview.id;


--
-- Name: layer_mut_1 id; Type: DEFAULT; Schema: tests_projects; Owner: lizmap
--

ALTER TABLE ONLY tests_projects.layer_mut_1 ALTER COLUMN id SET DEFAULT nextval('tests_projects.layer_mut_1_id_seq'::regclass);


--
-- Name: layer_mut_2 id; Type: DEFAULT; Schema: tests_projects; Owner: lizmap
--

ALTER TABLE ONLY tests_projects.layer_mut_2 ALTER COLUMN id SET DEFAULT nextval('tests_projects.layer_mut_2_id_seq'::regclass);


--
-- Name: layer_treeview id; Type: DEFAULT; Schema: tests_projects; Owner: lizmap
--

ALTER TABLE ONLY tests_projects.layer_treeview ALTER COLUMN id SET DEFAULT nextval('tests_projects.layer_treeview_id_seq'::regclass);


--
-- Data for Name: layer_mut_1; Type: TABLE DATA; Schema: tests_projects; Owner: lizmap
--

COPY tests_projects.layer_mut_1 (id, geom) FROM stdin;
1	01010000206A080000CFCCF8B33C702741C1692DC5D0F55741
\.


--
-- Data for Name: layer_mut_2; Type: TABLE DATA; Schema: tests_projects; Owner: lizmap
--

COPY tests_projects.layer_mut_2 (id, geom) FROM stdin;
1	01010000206A080000DD67D12F797027414035D3B590F45741
\.


--
-- Data for Name: layer_treeview; Type: TABLE DATA; Schema: tests_projects; Owner: lizmap
--

COPY tests_projects.layer_treeview (id, geom) FROM stdin;
1	01010000206A0800002C0BF86FAA822741AD373C84F5F45741
\.


--
-- Name: layer_mut_1_id_seq; Type: SEQUENCE SET; Schema: tests_projects; Owner: lizmap
--

SELECT pg_catalog.setval('tests_projects.layer_mut_1_id_seq', 1, true);


--
-- Name: layer_mut_2_id_seq; Type: SEQUENCE SET; Schema: tests_projects; Owner: lizmap
--

SELECT pg_catalog.setval('tests_projects.layer_mut_2_id_seq', 2, true);


--
-- Name: layer_treeview_id_seq; Type: SEQUENCE SET; Schema: tests_projects; Owner: lizmap
--

SELECT pg_catalog.setval('tests_projects.layer_treeview_id_seq', 1, true);


--
-- Name: layer_mut_1 layer_mut_1_pkey; Type: CONSTRAINT; Schema: tests_projects; Owner: lizmap
--

ALTER TABLE ONLY tests_projects.layer_mut_1
    ADD CONSTRAINT layer_mut_1_pkey PRIMARY KEY (id);


--
-- Name: layer_mut_2 layer_mut_2_pkey; Type: CONSTRAINT; Schema: tests_projects; Owner: lizmap
--

ALTER TABLE ONLY tests_projects.layer_mut_2
    ADD CONSTRAINT layer_mut_2_pkey PRIMARY KEY (id);


--
-- Name: layer_treeview layer_treeview_pkey; Type: CONSTRAINT; Schema: tests_projects; Owner: lizmap
--

ALTER TABLE ONLY tests_projects.layer_treeview
    ADD CONSTRAINT layer_treeview_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

