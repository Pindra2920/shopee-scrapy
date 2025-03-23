import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    proxyHost: process.env.PROXY_HOST || undefined,
    proxyPort: process.env.PROXY_PORT || undefined,
    proxyUsername: process.env.PROXY_USERNAME || undefined,
    proxyPassword: process.env.PROXY_PASSWORD || undefined,
    port: process.env.PORT || 3000
};