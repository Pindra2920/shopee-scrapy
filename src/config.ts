import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    proxyHost: process.env.PROXY_HOST,
    proxyPort: process.env.PROXY_PORT,
    proxyUsername: process.env.PROXY_USERNAME,
    proxyPassword: process.env.PROXY_PASSWORD,
    port: process.env.PORT
};