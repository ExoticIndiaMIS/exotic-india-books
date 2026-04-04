
   -- Modified Table 1: Metadata about the file upload
CREATE TABLE IF NOT EXISTS user_sheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL, -- Links to the 'users' table
    filename TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

    -- Table 2: The actual data from the sheets
    CREATE TABLE IF NOT EXISTS sheet_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sheet_id INTEGER NOT NULL, -- The 'Link' to Table 1
        user_id INTEGER NOT NULL,  -- Helps the user find their own records quickly
        data_field_1 TEXT,
        data_field_2 TEXT,
        data_field_3 TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sheet_id) REFERENCES user_sheets(id) ON DELETE CASCADE
    );

    -- CRITICAL: Indexing for speed as data grows
    CREATE INDEX IF NOT EXISTS idx_sheet_id ON sheet_records(sheet_id);
    CREATE INDEX IF NOT EXISTS idx_user_id ON sheet_records(user_id);


    -- Table 1: Roles (Admin, User, Editor, etc.)
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT UNIQUE NOT NULL, -- 'admin' or 'user'
    description TEXT
);

-- Table 2: Users
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_id INTEGER NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Never store plain text passwords!
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Seed initial roles (Run this only once)
INSERT OR IGNORE INTO roles (role_name, description) VALUES ('admin', 'System Administrator - Can view all sheets');
INSERT OR IGNORE INTO roles (role_name, description) VALUES ('user', 'Standard User - Can only view own sheets');