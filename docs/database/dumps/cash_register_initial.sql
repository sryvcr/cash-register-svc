--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7
-- Dumped by pg_dump version 13.1

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

--
-- Name: coin_types; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.coin_types AS ENUM (
    '50',
    '100',
    '200',
    '500',
    '1000',
    '5000',
    '10000',
    '20000',
    '100000',
    '50000'
);


--
-- Name: transaction_types; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.transaction_types AS ENUM (
    'deposit',
    'retirement',
    'vacate',
    'payment'
);


SET default_tablespace = '';

--
-- Name: money_inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.money_inventory (
    id bigint NOT NULL,
    coin integer NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    total bigint DEFAULT 0 NOT NULL
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    id uuid NOT NULL,
    amount integer NOT NULL,
    type public.transaction_types NOT NULL,
    created_at timestamp without time zone NOT NULL,
    coins json
);


--
-- Data for Name: money_inventory; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.money_inventory (id, coin, quantity, total) VALUES
	(3, 200, 0, 0),
	(6, 5000, 0, 0),
	(1, 50, 0, 0),
	(2, 100, 0, 0),
	(10, 100000, 0, 0),
	(4, 500, 0, 0),
	(9, 50000, 0, 0),
	(8, 20000, 0, 0),
	(7, 10000, 0, 0),
	(5, 1000, 0, 0);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: money_inventory coin_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.money_inventory
    ADD CONSTRAINT coin_inventory_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: money_inventory unique_coin_inventory_coin; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.money_inventory
    ADD CONSTRAINT unique_coin_inventory_coin UNIQUE (coin);


--
-- Name: index_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_created_at ON public.transactions USING btree (created_at);


--
-- Name: index_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_type ON public.transactions USING btree (type);


--
-- PostgreSQL database dump complete
--

