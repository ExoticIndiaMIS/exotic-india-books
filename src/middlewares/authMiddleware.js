import jwt from 'jsonwebtoken';
import BaseResponse from '../utils/BaseResponse.js'; // <-- Corrected import

const JWT_SECRET = "super_secret_exotic_books_key_2026"; 

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(BaseResponse.error("Unauthorized: Missing Token", 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(403).json(BaseResponse.error("Forbidden: Invalid or Expired Token", 403));
    }
};

export const isAdmin = (req, res, next) => {
       
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json(BaseResponse.error("Access denied: Admins only", 403));
    }
    next();
};