import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const { AUTH_TOKEN = '', NODE_ENV = 'production' } = process.env;
