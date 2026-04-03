import app from "./src/app.js";
import pool from "./src/config/database.js"
import  {initDB}  from "./src/config/sqlitedb.js";
const PORT = process.env.PORT || 3000;

async function startServer(){
    try{
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database!');
        connection.release();
      
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch(err){
        console.error('Error connecting to the database:', err.message);
        console.error(err.message);
        process.exit(1);
    }
}


startServer();