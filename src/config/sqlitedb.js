import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import BaseResponse from '../utils/BaseResponse.js';
import { loadQuery } from './databases/queries/sql_file_reader.js';




// Creating a Database connection to existing database or creating a new one if it doesn't exist.

let sqlite_conn_instance = null;
export const sqlite_conn = async ()=>{
    if(sqlite_conn_instance) return sqlite_conn_instance;
    sqlite_conn_instance = await open({
        filename: './src/config/databases/exotic_books.db',
        driver: sqlite3.Database
    });
    return sqlite_conn_instance;
}


// Initialize the database and create tables if they don't exist.
export const initDB = async () => {
    try {
        // Open the connection
        const conn = await sqlite_conn();
       // Load the SQL query to create tables from the file
        const folder="init";
        const file="create_tables";
        const get_create_tables_query = await loadQuery(folder, file);
        // Create your table here if it doesn't exist
        const get_create_tables_response = await conn.exec(get_create_tables_query.data);
        // Close the connection
        await conn.close();
        // Return a success response
        return BaseResponse.success('Database initialized successfully');
    } catch (err) {
        if (conn) {
            await conn.close();
        }
        throw BaseResponse.error('Error initializing database', err);
    }
};

initDB()


