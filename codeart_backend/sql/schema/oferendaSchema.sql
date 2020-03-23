-- Table: public.people

-- DROP TABLE public.people;

CREATE TABLE public.people
(
    person_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    person_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    person_url character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT authors_pkey PRIMARY KEY (person_id),
    CONSTRAINT person_url_unique UNIQUE (person_url)
)

TABLESPACE pg_default;

ALTER TABLE public.people
    OWNER to ben;


-- Table: public.stories

-- DROP TABLE public.stories;

CREATE TABLE public.stories
(
    story_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    story_text character varying COLLATE pg_catalog."default" NOT NULL,
    story_author integer NOT NULL,
    story_date date,
    story_person_subject integer NOT NULL,
    CONSTRAINT stories_pkey PRIMARY KEY (story_id),
    CONSTRAINT story_author_fkey FOREIGN KEY (story_author)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT story_subject_fkey FOREIGN KEY (story_person_subject)
        REFERENCES public.people (person_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.stories
    OWNER to ben;
-- Index: fki_story_author_fkey

-- DROP INDEX public.fki_story_author_fkey;

CREATE INDEX fki_story_author_fkey
    ON public.stories USING btree
    (story_author ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_story_subject_fkey

-- DROP INDEX public.fki_story_subject_fkey;

CREATE INDEX fki_story_subject_fkey
    ON public.stories USING btree
    (story_person_subject ASC NULLS LAST)
    TABLESPACE pg_default;


-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    "user_name" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "password_hash" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "password_salt" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to ben;