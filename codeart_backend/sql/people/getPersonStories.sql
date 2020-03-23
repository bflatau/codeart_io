SELECT
    person_name,
    person_url,
    person_birth,
    person_death
    -- make a new column called story_author to match foreign key w/ value
    -- b.user_name story_author
FROM people
-- JOIN users b
-- ON a.story_author = b.user_id



-- SELECT
--     story_text,
--     -- make a new column for the join called story_author
--     user_name story_author
-- FROM stories 
-- JOIN users
-- ON story_author = user_id;








-- `SELECT story_date, story_title, author_name, story_type, story_id
--         FROM stories
--         INNER JOIN story_types
--             ON stories.story_type_id = story_types.story_type_id
--         INNER JOIN authors
--             ON stories.author_id = authors.author_id ;`




-- SELECT
--     a.id id_a,
--     a.fruit fruit_a,
--     b.id id_b,
--     b.fruit fruit_b
-- FROM
--     basket_a a
-- INNER JOIN basket_b b ON a.fruit = b.fruit;