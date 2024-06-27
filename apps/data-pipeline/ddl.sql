-- public.documents definition

-- Drop table

-- DROP TABLE documents;

CREATE TABLE documents (
	id bigserial NOT NULL,
	description text NULL,
	"date" date NULL,
	time_start time NULL,
	time_end time NULL,
	interests _text NULL,
	embedding public.vector NULL,
	parent_id int8 NULL,
	is_taxonomy bool NULL DEFAULT false,
	CONSTRAINT documents_pkey PRIMARY KEY (id)
);


-- public.items definition

-- Drop table

-- DROP TABLE items;

CREATE TABLE items (
	id bigserial NOT NULL,
	embedding public.vector NULL,
	CONSTRAINT items_pkey PRIMARY KEY (id)
);


-- public.recent_session_embeddings definition

-- Drop table

-- DROP TABLE recent_session_embeddings;

CREATE TABLE recent_session_embeddings (
	id bigserial NOT NULL,
	user_id text NOT NULL,
	"date" date NOT NULL,
	time_start time NOT NULL,
	time_end time NOT NULL,
	description text NOT NULL,
	interests _text NOT NULL,
	embedding public.vector NOT NULL,
	CONSTRAINT recent_session_embeddings_pkey PRIMARY KEY (id)
);


-- public.recent_sessions_graph definition

-- Drop table

-- DROP TABLE recent_sessions_graph;

CREATE TABLE recent_sessions_graph (
	id bigserial NOT NULL,
	user_id text NOT NULL,
	parent_id int8 NOT NULL,
	child_id int8 NOT NULL,
	weight float8 NOT NULL,
	CONSTRAINT recent_sessions_graph_pkey PRIMARY KEY (id)
);


-- public.recent_sessions_merged definition

-- Drop table

-- DROP TABLE recent_sessions_merged;

CREATE TABLE recent_sessions_merged (
	id int8 NOT NULL DEFAULT nextval('recent_session_embeddings_id_seq'::regclass),
	user_id text NOT NULL,
	"date" date NOT NULL,
	time_start time NOT NULL,
	time_end time NOT NULL,
	description text NOT NULL,
	interests _text NOT NULL,
	embedding public.vector NOT NULL,
	CONSTRAINT recent_sessions_merged_pkey PRIMARY KEY (id)
);
