-- User query: Strict filtering by user_id
SELECT * FROM user_sheets 
WHERE user_id = ? 
ORDER BY created_at DESC;