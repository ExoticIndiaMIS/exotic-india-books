import * as UserService from '../services/userService.js';
import bcrypt from 'bcrypt';
import BaseResponse from '../utils/BaseResponse.js';
import jwt from 'jsonwebtoken'
const JWT_SECRET = "super_secret_exotic_books_key_2026";
/**
 * Handles User Registration
 */
export const register = async (req, res) => {
    try {
        const { username, password, email, role_id } = req.body;

        // 1. Basic Validation
        if (!username || !password || !email) {
            const error = BaseResponse.error("Username, password, and email are required", 400);
            console.log(error);
            return res.status(400).json(error);
        }

        // 2. Call the Service to create the user
        const db = req.db; 
        const result = await UserService.registerUser(db, { username, password, email, role_id });
        console.log("User registration result:", result);

        // 3. Return the result (Success or Error)
        return res.status(result.success ? 201 : 400).json(result);

    } catch (err) {
        const crash = BaseResponse.error("Server error during registration", err);
        return res.status(500).json(crash);
    }
};

/**
 * Handles User Login
 */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json(BaseResponse.error("Username and password required", 400));
        }

        const db = req.db;
        const userResult = await UserService.getUserByUsername(db, username);
        console.log("User result:", userResult);

        if (!userResult.success) {
            return res.status(404).json(userResult);
        }

        const user = userResult.data;
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json(BaseResponse.error("Invalid credentials", 401));
        }
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role // e.g., 'admin' or 'user'
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
        // Clean sensitive data
        delete user.password_hash;
        return res.status(200).json(BaseResponse.success("Login successful", { user, token }));

    } catch (err) {
        console.error("Server error during login:", err);
        return res.status(500).json(BaseResponse.error("Server error during login", err));
    }
};

export const getProfile = async (req, res) => {
    try {
        const db = req.db;
        console.log("Received profile request:", req.body);
        const { username } = req.body; // Assuming username is passed as a query parameter
        console.log("Received profile request with username:", username);

        if (!username) {
            return res.status(400).json(BaseResponse.error("Username is required", 400));
        }

        const userResult = await UserService.getUserByUsername(db, username);
        console.log("User result:", userResult);

        if (!userResult.success) {
            return res.status(404).json(userResult);
        }

        const user = userResult.data;
        // Clean sensitive data
        delete user.password_hash;
        return res.status(200).json(BaseResponse.success("Profile retrieved successfully", user));
    } catch (err) {
        console.error("Server error during profile retrieval:", err);
        return res.status(500).json(BaseResponse.error("Server error during profile retrieval", err));
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const db = req.db;
        const result = await UserService.getAllUsers(db);
        return res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
        console.error("Server error during fetching users:", err);
        return res.status(500).json(BaseResponse.error("Server error during fetching users", err));
    }
};