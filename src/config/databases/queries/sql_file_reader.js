import fs from 'fs/promises';
import path from 'path';
import BaseResponse from '../../../utils/BaseResponse.js';

/**
 * Utility to load SQL from a file
 * @param {string} category - folder name (e.g., 'init')
 * @param {string} fileName - file name (e.g., 'create_tables')
 */
export const loadQuery = async (category, fileName) => {
    try {
        const filePath = path.join(process.cwd(), 'src','config', 'databases', 'queries', category, `${fileName}.sql`);
        const query = await fs.readFile(filePath, 'utf-8');
        return BaseResponse.success('Query loaded successfully', query);
    } catch (error) {
        return BaseResponse.error(`Could not load SQL file: ${category}/${fileName}`, error);
    }
};