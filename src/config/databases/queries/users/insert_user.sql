-- Query to register a new user
INSERT INTO users (
    username, 
    password_hash, 
    email, 
    role_id
) VALUES (?, ?, ?, ?);