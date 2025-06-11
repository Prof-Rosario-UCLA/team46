--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9 (Homebrew)

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
-- Name: ConsumptionLog; Type: TABLE; Schema: public; Owner: pantrypal
--

CREATE TABLE public."ConsumptionLog" (
    id text NOT NULL,
    "userId" text NOT NULL,
    calories double precision NOT NULL,
    proteins double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "productId" text
);


ALTER TABLE public."ConsumptionLog" OWNER TO pantrypal;

--
-- Name: Goal; Type: TABLE; Schema: public; Owner: pantrypal
--

CREATE TABLE public."Goal" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "kcalDaily" integer NOT NULL,
    "proteinG" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Goal" OWNER TO pantrypal;

--
-- Name: PantryItem; Type: TABLE; Schema: public; Owner: pantrypal
--

CREATE TABLE public."PantryItem" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PantryItem" OWNER TO pantrypal;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: pantrypal
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    upc text NOT NULL,
    name text NOT NULL,
    brand text,
    nutrition jsonb
);


ALTER TABLE public."Product" OWNER TO pantrypal;

--
-- Name: User; Type: TABLE; Schema: public; Owner: pantrypal
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO pantrypal;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: pantrypal
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO pantrypal;

--
-- Data for Name: ConsumptionLog; Type: TABLE DATA; Schema: public; Owner: pantrypal
--

COPY public."ConsumptionLog" (id, "userId", calories, proteins, "createdAt", "productId") FROM stdin;
963504ae-f322-40a8-b800-7024ae96946c	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:24.282	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
e8097fa3-c1a4-4c55-9a7d-4b260bf5e85b	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:25.428	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
1da7bf48-0b39-448a-902f-95757ab79dd5	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:26.652	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
dc60ea5a-fb3c-41ab-85fb-96bf4dfa2169	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:44.449	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
1395be7f-f8a0-4160-a3e2-9bcfcc6194b1	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:47.548	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
58d30477-e605-46b3-a451-d99335694e14	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:47.725	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
783222fa-cb5b-4075-a6a2-3e3363e1fdff	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:47.933	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
d0067791-78f2-4479-824b-db8570a0e84e	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:33:48.067	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
abaf1d1d-7b8c-47b2-bd29-ef43f78a9e0a	44f9925e-302d-495e-a3eb-bd8400e4547c	60.06	0	2025-06-10 06:35:56.161	f6a43e94-29c8-4def-87dc-1319464bb0dd
2b85f5e6-b516-4997-bc93-6750c16c66ad	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:35:58.666	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
e1836ce0-0da1-4f63-899e-84abf2aefda5	44f9925e-302d-495e-a3eb-bd8400e4547c	0	0	2025-06-10 06:36:03.365	fbb49224-6b60-47c9-8ce4-6c39e9b225d8
2f8e6c7a-6ef8-4478-a4e1-ee281b6960df	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:03.582	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
bfce158b-0d21-4924-b199-ca9f3c76a4ed	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:03.784	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
103f1ad3-bb47-49ba-b838-bde4c43790b0	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:03.95	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
62431960-f538-4fe9-8c02-6db385703bbd	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:04.146	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
485a747e-e8d0-4f8e-9c2c-467970803ba4	44f9925e-302d-495e-a3eb-bd8400e4547c	190	3	2025-06-10 06:36:04.354	68a8ee8b-a78f-4138-be17-8c8152263a79
4ff1df1f-fb4a-4719-a93d-432be2a11a2a	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:05.918	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
2b36d310-b696-4dc0-9dbf-94a03578fce4	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:06.279	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
bb737561-730f-45f5-8bc1-cebded808dc0	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:06.469	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
bd0b88ab-3e9b-4291-8f86-2b2e2fbac498	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:36:06.621	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
b889fc10-5951-47e8-bbc1-3c86fc6d82b3	44f9925e-302d-495e-a3eb-bd8400e4547c	90	0	2025-06-10 06:36:10.385	fcc63069-5d68-4aef-ad50-545a8ab86f8c
19c9da4f-c2a7-4464-9e9f-3ab822fa3f67	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:37:28.071	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
87fc624f-d9dc-4d00-a12a-a857055fee91	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:37:30.391	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
0d6e9bd5-d267-42c5-a42f-2524bfc66f20	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-10 06:39:07.549	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
92e07636-810f-49f7-8485-15e26bd1dca3	44f9925e-302d-495e-a3eb-bd8400e4547c	230.184	42	2025-06-11 05:31:41.966	c98439e7-9551-4544-abd8-eec720fe245f
b27b54ce-88ba-4834-941b-2deb725ac23b	44f9925e-302d-495e-a3eb-bd8400e4547c	230.184	42	2025-06-11 05:31:42.124	c98439e7-9551-4544-abd8-eec720fe245f
b4e32426-9cc2-4558-9218-d6927f1a201a	44f9925e-302d-495e-a3eb-bd8400e4547c	230.184	42	2025-06-11 05:31:42.266	c98439e7-9551-4544-abd8-eec720fe245f
2bcbe71e-4e55-4293-9607-442fa8d8d883	44f9925e-302d-495e-a3eb-bd8400e4547c	230.184	42	2025-06-11 07:42:15.221	c98439e7-9551-4544-abd8-eec720fe245f
2cc1f3d2-c880-4409-ba09-4c4a481fea22	44f9925e-302d-495e-a3eb-bd8400e4547c	230.184	42	2025-06-11 07:42:15.379	c98439e7-9551-4544-abd8-eec720fe245f
e396f3e0-9a72-4b77-880d-6b542d8727fd	44f9925e-302d-495e-a3eb-bd8400e4547c	290	6	2025-06-11 07:42:30.436	56b81037-2701-4e20-a4ec-eb8ed1ca2ad1
14080e5c-76e3-480d-bd4b-7a38e0e8ecd0	44f9925e-302d-495e-a3eb-bd8400e4547c	160	3	2025-06-10 06:39:04.531	\N
\.


--
-- Data for Name: Goal; Type: TABLE DATA; Schema: public; Owner: pantrypal
--

COPY public."Goal" (id, "userId", "kcalDaily", "proteinG", "createdAt") FROM stdin;
76a00c08-7853-4751-b235-a85dcf9f3e84	44f9925e-302d-495e-a3eb-bd8400e4547c	2200	120	2025-06-08 23:05:20.397
\.


--
-- Data for Name: PantryItem; Type: TABLE DATA; Schema: public; Owner: pantrypal
--

COPY public."PantryItem" (id, "userId", "productId", quantity, "expiresAt", "createdAt", "updatedAt") FROM stdin;
4a80c2d9-ba0c-4121-a2ca-7899954aa7e6	f88e1485-c3b0-4fc1-b41c-ce1233072f37	fbb49224-6b60-47c9-8ce4-6c39e9b225d8	1	2025-06-10 20:27:21.656	2025-06-03 20:27:21.658	2025-06-08 23:02:08.526
adae7ce6-ea97-4869-a94e-5c29936540e8	f88e1485-c3b0-4fc1-b41c-ce1233072f37	fbb49224-6b60-47c9-8ce4-6c39e9b225d8	1	2025-06-10 20:40:53.253	2025-06-03 20:40:53.256	2025-06-08 23:02:09.567
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: pantrypal
--

COPY public."Product" (id, upc, name, brand, nutrition) FROM stdin;
fbb49224-6b60-47c9-8ce4-6c39e9b225d8	00015800069828	Barilla Spaghetti 1 lb	Barilla	\N
68a8ee8b-a78f-4138-be17-8c8152263a79	016000264694	Nature Valley Oats 'N Honey	nature-valley	{"fat": 7, "iron": 0.001, "salt": 0.35, "fiber": 2, "energy": 795, "sodium": 0.14, "sugars": 11, "fat_100g": 16.7, "fat_unit": "g", "proteins": 3, "fat_value": 7, "iron_100g": 0.00238, "iron_unit": "g", "salt_100g": 0.833, "salt_unit": "g", "trans-fat": 0, "fiber_100g": 4.76, "fiber_unit": "g", "iron_value": 0.001, "nova-group": 4, "salt_value": 0.35, "cholesterol": 0, "energy-kcal": 190, "energy_100g": 1890, "energy_unit": "kcal", "fat_serving": 7, "fiber_value": 2, "sodium_100g": 0.333, "sodium_unit": "g", "sugars_100g": 26.2, "sugars_unit": "g", "added-sugars": 11, "energy_value": 190, "iron_serving": 0.001, "salt_serving": 0.35, "sodium_value": 0.14, "sugars_value": 11, "carbohydrates": 29, "fiber_serving": 2, "proteins_100g": 7.14, "proteins_unit": "g", "saturated-fat": 1, "energy_serving": 795, "proteins_value": 3, "sodium_serving": 0.14, "sugars_serving": 11, "trans-fat_100g": 0, "trans-fat_unit": "g", "nova-group_100g": 4, "trans-fat_value": 0, "cholesterol_100g": 0, "cholesterol_unit": "g", "energy-kcal_100g": 452, "energy-kcal_unit": "kcal", "proteins_serving": 3, "added-sugars_100g": 26.2, "added-sugars_unit": "g", "cholesterol_value": 0, "energy-kcal_value": 190, "trans-fat_serving": 0, "added-sugars_value": 11, "carbohydrates_100g": 69, "carbohydrates_unit": "g", "nova-group_serving": 4, "nutrition-score-fr": 16, "saturated-fat_100g": 2.38, "saturated-fat_unit": "g", "carbohydrates_value": 29, "cholesterol_serving": 0, "energy-kcal_serving": 190, "saturated-fat_value": 1, "added-sugars_serving": 11, "carbohydrates_serving": 29, "saturated-fat_serving": 1, "nutrition-score-fr_100g": 16, "energy-kcal_value_computed": 195, "fruits-vegetables-nuts-estimate-from-ingredients_100g": 13.1, "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0, "fruits-vegetables-nuts-estimate-from-ingredients_serving": 13.1, "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0}
56b81037-2701-4e20-a4ec-eb8ed1ca2ad1	041789001253	Ramen Noodle Soup With Shrimp	maruchan	{"fat": 12, "iron": 0.0027, "salt": 2.675, "fiber": 2, "energy": 1213, "sodium": 1.07, "sugars": 2, "fat_100g": 18.8, "fat_unit": "g", "proteins": 6, "energy-kj": 1213, "fat_value": 12, "iron_100g": 0.00422, "iron_unit": "g", "potassium": 0.15, "salt_100g": 4.18, "salt_unit": "g", "trans-fat": 0, "fiber_100g": 3.12, "fiber_unit": "g", "iron_value": 0.0027, "nova-group": 4, "salt_value": 2.675, "cholesterol": 0.005, "energy-kcal": 290, "energy_100g": 1900, "energy_unit": "kJ", "fat_serving": 12, "fiber_value": 2, "sodium_100g": 1.67, "sodium_unit": "g", "sugars_100g": 3.12, "sugars_unit": "g", "added-sugars": 1, "energy_value": 1213, "iron_serving": 0.0027, "salt_serving": 2.675, "sodium_value": 1.07, "sugars_value": 2, "carbohydrates": 39, "fiber_serving": 2, "proteins_100g": 9.38, "proteins_unit": "g", "saturated-fat": 6, "energy-kj_100g": 1900, "energy-kj_unit": "kJ", "energy_serving": 1213, "potassium_100g": 0.234, "potassium_unit": "g", "proteins_value": 6, "sodium_serving": 1.07, "sugars_serving": 2, "trans-fat_100g": 0, "trans-fat_unit": "g", "energy-kj_value": 1213, "nova-group_100g": 4, "potassium_value": 0.15, "trans-fat_value": 0, "cholesterol_100g": 0.00781, "cholesterol_unit": "g", "energy-kcal_100g": 453, "energy-kcal_unit": "kcal", "proteins_serving": 6, "added-sugars_100g": 1.56, "added-sugars_unit": "g", "cholesterol_value": 0.005, "energy-kcal_value": 290, "energy-kj_serving": 1213, "potassium_serving": 0.15, "trans-fat_serving": 0, "added-sugars_value": 1, "carbohydrates_100g": 60.9, "carbohydrates_unit": "g", "nova-group_serving": 4, "saturated-fat_100g": 9.38, "saturated-fat_unit": "g", "carbohydrates_value": 39, "cholesterol_serving": 0.005, "energy-kcal_serving": 290, "saturated-fat_value": 6, "added-sugars_serving": 1, "carbohydrates_serving": 39, "saturated-fat_serving": 6, "energy-kj_value_computed": 1225, "energy-kcal_value_computed": 292, "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0.398717969655991, "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0.0178585946559906, "fruits-vegetables-nuts-estimate-from-ingredients_serving": 0.398717969655991, "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0.0178585946559906}
fcc63069-5d68-4aef-ad50-545a8ab86f8c	048001213364	Real Mayonnaise	best-foods	{"fat": 10, "salt": 0.2375, "energy": 377, "iodine": 0, "sodium": 0.095, "glucose": 0, "lactose": 0, "fat_100g": 76.9, "fat_unit": "g", "fluoride": 0, "fructose": 0, "proteins": 0, "fat_value": 10, "salt_100g": 1.83, "salt_unit": "g", "trans-fat": 0, "nova-group": 4, "salt_value": 0.2375, "vitamin-pp": 0, "cholesterol": 0.005, "energy-kcal": 90, "energy_100g": 2900, "energy_unit": "kcal", "fat_serving": 10, "iodine_100g": 0, "iodine_unit": "µg", "sodium_100g": 0.731, "sodium_unit": "g", "energy_value": 90, "glucose_100g": 0, "glucose_unit": "g", "iodine_value": 0, "lactose_100g": 0, "lactose_unit": "g", "salt_serving": 0.2375, "sodium_value": 0.095, "carbohydrates": 0, "fluoride_100g": 0, "fluoride_unit": "µg", "fructose_100g": 0, "fructose_unit": "g", "glucose_value": 0, "lactose_value": 0, "proteins_100g": 0, "proteins_unit": "g", "saturated-fat": 1.5, "energy_serving": 377, "fluoride_value": 0, "fructose_value": 0, "iodine_serving": 0, "proteins_value": 0, "sodium_serving": 0.095, "trans-fat_100g": 0, "trans-fat_unit": "g", "glucose_serving": 0, "lactose_serving": 0, "nova-group_100g": 4, "trans-fat_value": 0, "vitamin-pp_100g": 0, "vitamin-pp_unit": "mg", "cholesterol_100g": 0.0385, "cholesterol_unit": "g", "energy-kcal_100g": 692, "energy-kcal_unit": "kcal", "fluoride_serving": 0, "fructose_serving": 0, "proteins_serving": 0, "vitamin-pp_value": 0, "cholesterol_value": 0.005, "energy-kcal_value": 90, "trans-fat_serving": 0, "carbohydrates_100g": 0, "carbohydrates_unit": "g", "nova-group_serving": 4, "nutrition-score-fr": 27, "saturated-fat_100g": 11.5, "saturated-fat_unit": "g", "vitamin-pp_serving": 0, "carbohydrates_value": 0, "cholesterol_serving": 0.005, "energy-kcal_serving": 90, "saturated-fat_value": 1.5, "carbohydrates_serving": 0, "saturated-fat_serving": 1.5, "nutrition-score-fr_100g": 27, "energy-kcal_value_computed": 90, "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0.3515625, "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0.3515625, "fruits-vegetables-nuts-estimate-from-ingredients_serving": 0.3515625, "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0.3515625}
26fd16f2-c66b-4500-b1e9-061ed1de19b1	038000313295	Kelloggs cereal in a cup	kellogg-s	{"fat": 1.50023, "iron": 0.0213, "salt": 0.025, "zinc": 0.0015, "fiber": 7, "energy": 1046, "sodium": 0.01, "sugars": 15, "calcium": 0.01, "folates": 0.00037, "fat_100g": 2.11, "fat_unit": "g", "proteins": 6, "fat_value": 1.50023, "iron_100g": 0.03, "iron_unit": "g", "magnesium": 0.04, "potassium": 0.19, "salt_100g": 0.0352, "salt_unit": "g", "trans-fat": 0, "vitamin-d": 0, "zinc_100g": 0.00211, "zinc_unit": "g", "fiber_100g": 9.86, "fiber_unit": "g", "iron_value": 0.0213, "nova-group": 4, "phosphorus": 0.1, "salt_value": 0.025, "vitamin-b1": 0.00015, "vitamin-b9": 0.00044, "vitamin-pp": 0.008451, "zinc_value": 0.0015, "cholesterol": 0, "energy-kcal": 250, "energy_100g": 1470, "energy_unit": "kcal", "fat_serving": 1.50023, "fiber_value": 7, "sodium_100g": 0.0141, "sodium_unit": "g", "sugars_100g": 21.1, "sugars_unit": "g", "added-sugars": 14, "calcium_100g": 0.0141, "calcium_unit": "g", "energy_value": 250, "folates_100g": 0.000521, "folates_unit": "µg", "iron_serving": 0.0213, "salt_serving": 0.025, "sodium_value": 0.01, "sugars_value": 15, "zinc_serving": 0.0015, "calcium_value": 0.01, "carbohydrates": 60, "fiber_serving": 7, "folates_value": 370, "proteins_100g": 8.45, "proteins_unit": "g", "saturated-fat": 0, "soluble-fiber": 1, "energy_serving": 1046, "magnesium_100g": 0.0563, "magnesium_unit": "g", "potassium_100g": 0.268, "potassium_unit": "g", "proteins_value": 6, "sodium_serving": 0.01, "sugars_serving": 15, "trans-fat_100g": 0, "trans-fat_unit": "g", "vitamin-d_100g": 0, "vitamin-d_unit": "g", "calcium_serving": 0.01, "folates_serving": 0.00037, "insoluble-fiber": 10, "magnesium_value": 0.04, "nova-group_100g": 4, "phosphorus_100g": 0.141, "phosphorus_unit": "g", "potassium_value": 0.19, "trans-fat_value": 0, "vitamin-b1_100g": 0.000211, "vitamin-b1_unit": "g", "vitamin-b9_100g": 0.00062, "vitamin-b9_unit": "g", "vitamin-d_value": 0, "vitamin-pp_100g": 0.0119, "vitamin-pp_unit": "g", "cholesterol_100g": 0, "cholesterol_unit": "g", "energy-kcal_100g": 352, "energy-kcal_unit": "kcal", "phosphorus_value": 0.1, "proteins_serving": 6, "vitamin-b1_value": 0.00015, "vitamin-b9_value": 0.00044, "vitamin-pp_value": 0.008451, "added-sugars_100g": 19.7, "added-sugars_unit": "g", "cholesterol_value": 0, "energy-kcal_value": 250, "magnesium_serving": 0.04, "potassium_serving": 0.19, "trans-fat_serving": 0, "vitamin-d_serving": 0, "added-sugars_value": 14, "carbohydrates_100g": 84.5, "carbohydrates_unit": "g", "nova-group_serving": 4, "nutrition-score-fr": 2, "phosphorus_serving": 0.1, "saturated-fat_100g": 0, "saturated-fat_unit": "g", "soluble-fiber_100g": 1.41, "soluble-fiber_unit": "g", "vitamin-b1_serving": 0.00015, "vitamin-b9_serving": 0.00044, "vitamin-pp_serving": 0.008451, "carbohydrates_value": 60, "cholesterol_serving": 0, "energy-kcal_serving": 250, "saturated-fat_value": 0, "soluble-fiber_value": 1, "added-sugars_serving": 14, "insoluble-fiber_100g": 14.1, "insoluble-fiber_unit": "g", "carbohydrates_serving": 60, "insoluble-fiber_value": 10, "saturated-fat_serving": 0, "soluble-fiber_serving": 1, "insoluble-fiber_serving": 10, "nutrition-score-fr_100g": 2, "energy-kcal_value_computed": 291.50207, "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0, "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0, "fruits-vegetables-nuts-estimate-from-ingredients_serving": 0, "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0}
f6a43e94-29c8-4def-87dc-1319464bb0dd	898999000022	Coconut Water	vita-coco	{"fat": 0, "salt": 0.25, "energy": 251, "sodium": 0.1, "sugars": 13.002, "calcium": 0.03993, "fat_100g": 0, "fat_unit": "g", "proteins": 0, "fat_value": 0, "magnesium": 0.026004, "potassium": 0.6468, "salt_100g": 0.0758, "salt_unit": "g", "vitamin-c": 0.05907, "nova-group": 3, "salt_value": 0.25, "energy-kcal": 60.06, "energy_100g": 76.1, "energy_unit": "kcal", "fat_serving": 0, "sodium_100g": 0.0303, "sodium_unit": "g", "sugars_100g": 3.94, "sugars_unit": "g", "added-sugars": 1, "calcium_100g": 0.0121, "calcium_unit": "g", "energy_value": 60.06, "salt_serving": 0.25, "sodium_value": 0.1, "sugars_value": 13.002, "calcium_value": 0.03993, "carbohydrates": 15.015, "proteins_100g": 0, "proteins_unit": "g", "energy_serving": 251, "magnesium_100g": 0.00788, "magnesium_unit": "g", "potassium_100g": 0.196, "potassium_unit": "g", "proteins_value": 0, "sodium_serving": 0.1, "sugars_serving": 13.002, "vitamin-c_100g": 0.0179, "vitamin-c_unit": "g", "calcium_serving": 0.03993, "magnesium_value": 0.026004, "nova-group_100g": 3, "potassium_value": 0.6468, "vitamin-c_value": 0.05907, "energy-kcal_100g": 18.2, "energy-kcal_unit": "kcal", "proteins_serving": 0, "added-sugars_100g": 0.303, "added-sugars_unit": "g", "energy-kcal_value": 60.06, "magnesium_serving": 0.026004, "potassium_serving": 0.6468, "vitamin-c_serving": 0.05907, "added-sugars_value": 1, "carbohydrates_100g": 4.55, "carbohydrates_unit": "g", "nova-group_serving": 3, "nutrition-score-fr": -2, "carbohydrates_value": 15.015, "energy-kcal_serving": 60.06, "added-sugars_serving": 1, "carbohydrates_serving": 15.015, "nutrition-score-fr_100g": -2, "energy-kcal_value_computed": 60.06, "carbon-footprint-from-known-ingredients_product": 98, "carbon-footprint-from-known-ingredients_serving": 98, "fruits-vegetables-nuts-estimate-from-ingredients_100g": 96.06, "fruits-vegetables-legumes-estimate-from-ingredients_100g": 96.06, "fruits-vegetables-nuts-estimate-from-ingredients_serving": 96.06, "fruits-vegetables-legumes-estimate-from-ingredients_serving": 96.06}
c84ba1e0-e0a7-4014-b23e-d73a711ec098	722252443007	Builders protein + caffeine	clif	{"fat": 10, "iron": 0.003, "salt": 0.6, "fiber": 2, "energy": 1213, "sodium": 0.24, "sugars": 18, "calcium": 0.047, "caffeine": 0.065008, "fat_100g": 14.7, "fat_unit": "g", "proteins": 20, "fat_value": 10, "iron_100g": 0.00441, "iron_unit": "g", "potassium": 0.224, "salt_100g": 0.882, "salt_unit": "g", "fiber_100g": 2.94, "fiber_unit": "g", "iron_value": 0.003, "nova-group": 4, "salt_value": 0.6, "energy-kcal": 290, "energy_100g": 1780, "energy_unit": "kcal", "fat_serving": 10, "fiber_value": 2, "sodium_100g": 0.353, "sodium_unit": "g", "sugars_100g": 26.5, "sugars_unit": "g", "added-sugars": 17, "calcium_100g": 0.0691, "calcium_unit": "g", "energy_value": 290, "iron_serving": 0.003, "salt_serving": 0.6, "sodium_value": 0.24, "sugars_value": 18, "caffeine_100g": 0.0956, "caffeine_unit": "g", "calcium_value": 0.047, "carbohydrates": 29, "fiber_serving": 2, "proteins_100g": 29.4, "proteins_unit": "g", "saturated-fat": 6, "caffeine_value": 0.065008, "energy_serving": 1213, "potassium_100g": 0.329, "potassium_unit": "g", "proteins_value": 20, "sodium_serving": 0.24, "sugars_serving": 18, "calcium_serving": 0.047, "nova-group_100g": 4, "potassium_value": 0.224, "caffeine_serving": 0.065008, "energy-kcal_100g": 426, "energy-kcal_unit": "kcal", "proteins_serving": 20, "added-sugars_100g": 25, "added-sugars_unit": "g", "energy-kcal_value": 290, "potassium_serving": 0.224, "added-sugars_value": 17, "carbohydrates_100g": 42.6, "carbohydrates_unit": "g", "nova-group_serving": 4, "saturated-fat_100g": 8.82, "saturated-fat_unit": "g", "carbohydrates_value": 29, "energy-kcal_serving": 290, "saturated-fat_value": 6, "added-sugars_serving": 17, "carbohydrates_serving": 29, "saturated-fat_serving": 6, "energy-kcal_value_computed": 290, "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0.0933692568824398, "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0.0933692568824398, "fruits-vegetables-nuts-estimate-from-ingredients_serving": 0.0933692568824398, "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0.0933692568824398}
c98439e7-9551-4544-abd8-eec720fe245f	811620020633	Core Power Elite Chocolate	fairlife	{"fat": 3.5, "iron": 0.001598, "salt": 0.64998, "fiber": 2, "energy": 963, "sodium": 0.259992, "sugars": 6.997, "calcium": 0.89838, "fat_100g": 0.845, "fat_unit": "g", "proteins": 42, "fat_value": 3.5, "iron_100g": 0.000386, "iron_unit": "g", "potassium": 0.69966, "salt_100g": 0.157, "salt_unit": "g", "vitamin-a": 0.00024012, "vitamin-d": 0.000010019, "fiber_100g": 0.483, "fiber_unit": "g", "iron_value": 0.001598, "nova-group": 4, "salt_value": 0.64998, "cholesterol": 0.014987, "energy-kcal": 230.184, "energy_100g": 233, "energy_unit": "kcal", "fat_serving": 3.5, "fiber_value": 2, "sodium_100g": 0.0628, "sodium_unit": "g", "sugars_100g": 1.69, "sugars_unit": "g", "calcium_100g": 0.217, "calcium_unit": "g", "energy_value": 230.184, "iron_serving": 0.001598, "salt_serving": 0.64998, "sodium_value": 0.259992, "sugars_value": 6.997, "calcium_value": 0.89838, "carbohydrates": 9, "fiber_serving": 2, "proteins_100g": 10.1, "proteins_unit": "g", "saturated-fat": 2, "energy_serving": 963, "potassium_100g": 0.169, "potassium_unit": "g", "proteins_value": 42, "sodium_serving": 0.259992, "sugars_serving": 6.997, "vitamin-a_100g": 0.000058, "vitamin-a_unit": "g", "vitamin-d_100g": 0.00000242, "vitamin-d_unit": "g", "calcium_serving": 0.89838, "nova-group_100g": 4, "potassium_value": 0.69966, "vitamin-a_value": 0.00024012, "vitamin-d_value": 0.000010019, "cholesterol_100g": 0.00362, "cholesterol_unit": "g", "energy-kcal_100g": 55.6, "energy-kcal_unit": "kcal", "proteins_serving": 42, "cholesterol_value": 0.014987, "energy-kcal_value": 230.184, "potassium_serving": 0.69966, "vitamin-a_serving": 0.00024012, "vitamin-d_serving": 0.000010019, "carbohydrates_100g": 2.17, "carbohydrates_unit": "g", "nova-group_serving": 4, "saturated-fat_100g": 0.483, "saturated-fat_unit": "g", "carbohydrates_value": 9, "cholesterol_serving": 0.014987, "energy-kcal_serving": 230.184, "saturated-fat_value": 2, "carbohydrates_serving": 9, "saturated-fat_serving": 2, "energy-kcal_value_computed": 239.5, "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0, "fruits-vegetables-legumes-estimate-from-ingredients_100g": 0, "fruits-vegetables-nuts-estimate-from-ingredients_serving": 0, "fruits-vegetables-legumes-estimate-from-ingredients_serving": 0}
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: pantrypal
--

COPY public."User" (id, email, password) FROM stdin;
f88e1485-c3b0-4fc1-b41c-ce1233072f37	demo@pantry.pal	$2b$10$K37sReSqqWxINT35G7HhHeRFiZcLE5lBMizLP76/wfOMWYkvoBMPm
b572420e-4abf-43d7-a864-85df36cfd0e0	me@test.com	$2b$10$YckiIw1380SYXX02oYHJtOoYKPGUGr0ymjm9gi1Ge4Ix/AMg3gem2
715b2eb1-231d-4642-af33-6bc597df52d5	user1@example.com	$2b$10$XvonHLKKV3uv9AgO1QqtJ.SfjubrkJytJuM8o5sEAIulCyzEa891G
596030d3-b981-4808-9a83-6c46869d62b9	pantrytest@example.com	$2b$10$mHrtXfhpyFaEJXAQXNZ9p.FiUiLS/KwrDQ5Y1vBRiXoDhCwcRBQty
44f9925e-302d-495e-a3eb-bd8400e4547c	pantryuser@example.com	$2b$10$fqDWu7kBaG8eG2h7qAK0aenSAJbhKXaTBRZUl4VIEzhOTaPOE2opa
6a483b30-ad83-4292-87a3-bc8d205d0072	pantryuser2@example.com	$2b$10$qaXiBpFGqZ2aXHV0.7iXGuwHfTtkMRNgXyauATNRBjiuG9Jbb63j2
7ac8f211-2e0f-45de-ba21-6d9e07cf0661	pantryuser5@example.com	$2b$10$MT1tnsCkG/91MjabNsiV1u40x6ntAjVsrfQB9nkUuDX9ikJBC2QDi
827f33d8-3151-4434-86c9-d9d634a64439	pantryuser6@example.com	$2b$10$cjGVGwVRisLu7oJT85ddneLR3L5V0l4mxQKdx5KuioLbo2DNgxOOS
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: pantrypal
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5936e318-b82e-45f0-8946-58d021562962	4dc56bdefa3ff8246a288d9565b33c8771ac76785d8fc4b7a573c579e283e52c	2025-06-03 20:24:46.352517+00	20250603202446_init	\N	\N	2025-06-03 20:24:46.339359+00	1
4a6456a8-ba29-42c2-9fdc-586e8977cc2d	0631b3367b4d1197411abc803f17133d3b6003911d85fce066b0717bf482b873	2025-06-08 19:35:00.127523+00	20250608193459_add_consumption_log	\N	\N	2025-06-08 19:35:00.109082+00	1
b0a5f865-0dfb-4c4f-90f2-013b34a95a46	74287c3c8033499f5536e039f8dc62b5fa020f0217a31bfd81d8b67731c20166	2025-06-08 22:58:19.2448+00	20250608225818_goal_user_unique	\N	\N	2025-06-08 22:58:19.23445+00	1
\.


--
-- Name: ConsumptionLog ConsumptionLog_pkey; Type: CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."ConsumptionLog"
    ADD CONSTRAINT "ConsumptionLog_pkey" PRIMARY KEY (id);


--
-- Name: Goal Goal_pkey; Type: CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."Goal"
    ADD CONSTRAINT "Goal_pkey" PRIMARY KEY (id);


--
-- Name: PantryItem PantryItem_pkey; Type: CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."PantryItem"
    ADD CONSTRAINT "PantryItem_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Goal_userId_key; Type: INDEX; Schema: public; Owner: pantrypal
--

CREATE UNIQUE INDEX "Goal_userId_key" ON public."Goal" USING btree ("userId");


--
-- Name: Product_upc_key; Type: INDEX; Schema: public; Owner: pantrypal
--

CREATE UNIQUE INDEX "Product_upc_key" ON public."Product" USING btree (upc);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: pantrypal
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: ConsumptionLog ConsumptionLog_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."ConsumptionLog"
    ADD CONSTRAINT "ConsumptionLog_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ConsumptionLog ConsumptionLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."ConsumptionLog"
    ADD CONSTRAINT "ConsumptionLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Goal Goal_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."Goal"
    ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PantryItem PantryItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."PantryItem"
    ADD CONSTRAINT "PantryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PantryItem PantryItem_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pantrypal
--

ALTER TABLE ONLY public."PantryItem"
    ADD CONSTRAINT "PantryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

