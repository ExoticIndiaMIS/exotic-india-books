-- Query to find a user and their specific role for login/authorization
SELECT 
    u.id, 
    u.username, 
    u.password_hash, 
    u.email, 
    u.role_id, 
    r.role_name AS role
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.username = ?;