export const PORT = process.env.PORT ? process.env.PORT : 5000;
export const DOMAIN = process.env.DOMAIN ? process.env.DOMAIN : 'localhost:5000';
export const URL = process.env.DOMAIN ? `https://${process.env.DOMAIN}` : 'http://localhost:5000';
//redis
export const REDIS_HOST = process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1';
export const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;