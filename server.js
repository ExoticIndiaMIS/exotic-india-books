import app from "./src/app.js";
import  {initDB,sqlite_conn}  from "./src/config/sqlitedb.js";
import 'dotenv/config';
const PORT = process.env.PORT ;


async function startServer(){
    try{
        const db = await sqlite_conn();
        console.log('Successfully connected to the database!');
        // connection.release();
      
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