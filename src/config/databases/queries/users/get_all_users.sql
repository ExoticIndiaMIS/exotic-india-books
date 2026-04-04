-- Query for Admin to view all registered users and their roles
SELECT 
    u.id, 
    u.username, 
    u.email, 
    u.role_id, 
    r.role_name AS role,
    u.created_at
FROM users u
JOIN roles r ON u.role_id = r.id
ORDER BY u.created_at DESC;