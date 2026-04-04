import bcrypt from 'bcrypt';
import { loadQuery } from '../config/databases/queries/sql_file_reader.js';
import BaseResponse from '../utils/BaseResponse.js';


const SALT_ROUNDS = 10; // Standard security level for hashing

/**
 * Creates a new user in the system
 */
export const registerUser = async (db, userData) => {
    try {
        // 1. Hash the password before saving
        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

        // 2. Load the SQL query
        const query = await loadQuery('users', 'insert_user');

        // 3. Execute (assuming default role is 'user')
        const result = await db.run(query.data, [
            userData.username,
            hashedPassword,
            userData.email,
            userData.role_id || 2 // Default to 'user' role
        ]);
        console.log("User registration result:", result);
        return BaseResponse.success("User registered successfully", { id: result.lastID });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return BaseResponse.error("Username or Email already exists", 400);
        }
        console.error("Error during user registration:", err);
        return BaseResponse.error("Registration failed", err);
    }
};

/**
 * Finds a user by username (for Login)
 */
export const getUserByUsername = async (db, username) => {
    try {
        const query = await loadQuery('users', 'get_user_by_username');
        
        // We join with the roles table to get the role name (admin/user)
        const user = await db.get(query.data, [username]);

        if (!user) {
            return BaseResponse.error("User not found", 404);
        }

        return BaseResponse.success("User found", user);
    } catch (err) {
        return BaseResponse.error("Database error during user lookup", err);
    }
};

/**
 * Fetch all registered users (Admin only)
 */
export const getAllUsers = async (db) => {
    try {
        const query = await loadQuery('users', 'get_all_users');    
        const users = await db.all(query.data);
        return BaseResponse.success("Users retrieved successfully", users); 
    } catch (err) {
        return BaseResponse.error("Database error during fetching users", err);
    }
};