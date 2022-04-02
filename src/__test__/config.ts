// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

export const { AUTH_TOKEN = '', NODE_ENV = 'production' } = process.env;
