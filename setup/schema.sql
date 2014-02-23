--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.1
-- Dumped by pg_dump version 9.3.1
-- Started on 2014-02-23 13:05:41 ICT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 176 (class 3079 OID 12018)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2237 (class 0 OID 0)
-- Dependencies: 176
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 170 (class 1259 OID 16547)
-- Name: MarriageRelations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "MarriageRelations" (
    "insidePersonId" integer NOT NULL,
    "outsidePersonId" integer NOT NULL,
    "startDate" date,
    "endDate" date,
    note text,
    "isStillMarriage" boolean
);


--
-- TOC entry 2238 (class 0 OID 0)
-- Dependencies: 170
-- Name: COLUMN "MarriageRelations"."insidePersonId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "MarriageRelations"."insidePersonId" IS 'the ID of the person inside the family pedigree (natural children)';


--
-- TOC entry 2239 (class 0 OID 0)
-- Dependencies: 170
-- Name: COLUMN "MarriageRelations"."outsidePersonId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "MarriageRelations"."outsidePersonId" IS 'the Id of the outside person';


--
-- TOC entry 2240 (class 0 OID 0)
-- Dependencies: 170
-- Name: COLUMN "MarriageRelations"."startDate"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "MarriageRelations"."startDate" IS 'starting date of the marriage';


--
-- TOC entry 2241 (class 0 OID 0)
-- Dependencies: 170
-- Name: COLUMN "MarriageRelations"."endDate"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "MarriageRelations"."endDate" IS 'the end date of the marriage';


--
-- TOC entry 171 (class 1259 OID 16553)
-- Name: PedigreeRelations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "PedigreeRelations" (
    "insideParentId" integer NOT NULL,
    "outsideParentId" integer NOT NULL,
    "childId" integer NOT NULL
);


--
-- TOC entry 2242 (class 0 OID 0)
-- Dependencies: 171
-- Name: COLUMN "PedigreeRelations"."insideParentId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "PedigreeRelations"."insideParentId" IS 'the id of the parent who is inside the pedigree';


--
-- TOC entry 2243 (class 0 OID 0)
-- Dependencies: 171
-- Name: COLUMN "PedigreeRelations"."outsideParentId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "PedigreeRelations"."outsideParentId" IS 'the Id of the parent who are ouside of the pedigree';


--
-- TOC entry 172 (class 1259 OID 16556)
-- Name: People; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "People" (
    id integer NOT NULL,
    name character varying NOT NULL,
    "birthDate" date,
    "deathDate" date,
    "isAlive" boolean,
    job character varying,
    address character varying,
    picture character varying,
    gender character varying,
    "phoneNo" bit varying,
    "idCard" bit varying,
    note text
);


--
-- TOC entry 173 (class 1259 OID 16562)
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    password text NOT NULL,
    username character varying NOT NULL
);


--
-- TOC entry 174 (class 1259 OID 16568)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2244 (class 0 OID 0)
-- Dependencies: 174
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "People".id;


--
-- TOC entry 175 (class 1259 OID 16570)
-- Name: Users_id_seq1; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Users_id_seq1"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2245 (class 0 OID 0)
-- Dependencies: 175
-- Name: Users_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Users_id_seq1" OWNED BY "Users".id;


--
-- TOC entry 2106 (class 2604 OID 16572)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "People" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- TOC entry 2107 (class 2604 OID 16573)
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq1"'::regclass);


--
-- TOC entry 2109 (class 2606 OID 16575)
-- Name: pk_marriage; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "MarriageRelations"
    ADD CONSTRAINT pk_marriage PRIMARY KEY ("insidePersonId", "outsidePersonId");


--
-- TOC entry 2111 (class 2606 OID 16577)
-- Name: pk_pedigree; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "PedigreeRelations"
    ADD CONSTRAINT pk_pedigree PRIMARY KEY ("insideParentId", "outsideParentId", "childId");


--
-- TOC entry 2113 (class 2606 OID 16579)
-- Name: pk_people; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "People"
    ADD CONSTRAINT pk_people PRIMARY KEY (id);


--
-- TOC entry 2115 (class 2606 OID 16581)
-- Name: pk_users; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- TOC entry 2117 (class 2606 OID 16636)
-- Name: un_users; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT un_users UNIQUE (username);


--
-- TOC entry 2118 (class 2606 OID 16584)
-- Name: fk_marriage_inside; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "MarriageRelations"
    ADD CONSTRAINT fk_marriage_inside FOREIGN KEY ("insidePersonId") REFERENCES "People"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2119 (class 2606 OID 16589)
-- Name: fk_marriage_outside; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "MarriageRelations"
    ADD CONSTRAINT fk_marriage_outside FOREIGN KEY ("outsidePersonId") REFERENCES "People"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2120 (class 2606 OID 16594)
-- Name: fk_pedigree_child; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "PedigreeRelations"
    ADD CONSTRAINT fk_pedigree_child FOREIGN KEY ("childId") REFERENCES "People"(id);


--
-- TOC entry 2121 (class 2606 OID 16599)
-- Name: fk_pedigree_inside; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "PedigreeRelations"
    ADD CONSTRAINT fk_pedigree_inside FOREIGN KEY ("insideParentId") REFERENCES "People"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2122 (class 2606 OID 16604)
-- Name: fk_pedigree_outside; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "PedigreeRelations"
    ADD CONSTRAINT fk_pedigree_outside FOREIGN KEY ("outsideParentId") REFERENCES "People"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2236 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM tmtxt;
GRANT ALL ON SCHEMA public TO tmtxt;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2014-02-23 13:05:41 ICT

--
-- PostgreSQL database dump complete
--

