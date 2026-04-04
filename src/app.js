import express from 'express';
import userRoutes from '.././src/routes/userRoutes.js';
import {  sqlite_conn} from './config/sqlitedb.js';
import { setupSwagger } from './utils/swagger.js';

const app = express();

app.use(express.json());

// 1. Initialize your DB
const db = await sqlite_conn(); 

// 2. Middleware (THIS MUST COME BEFORE ROUTES)
app.use((req, res, next) => {
    if (!db) {
        console.error("DB connection is missing in middleware!");
    }
    req.db = db; // Attach the connection to the request
    next();
});

setupSwagger(app);
// 3. Register Routes
app.use('/api/users', userRoutes);

// 4. Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

export  default  app;