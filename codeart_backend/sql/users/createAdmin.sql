INSERT INTO users("user_name", "password_hash", "password_salt") 
VALUES ($1, $2, $3) 
RETURNING *