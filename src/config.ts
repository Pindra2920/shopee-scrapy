import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    proxyHost: process.env.PROXY_HOST || undefined,
    proxyPort: process.env.PROXY_PORT || undefined,
    proxyUsername: process.env.PROXY_USERNAME || undefined,
    proxyPassword: process.env.PROXY_PASSWORD || undefined,
    port: process.env.PORT || 3000,
    // Shopee request header values (optional; fill from browser-captured headers)
    shopeeCookie: process.env.SHOPEE_COOKIE || undefined,
    shopeeAfAcEncDat: process.env.SHOPEE_AF_AC_ENC_DAT || undefined,
    shopeeAfAcEncSzToken: process.env.SHOPEE_AF_AC_ENC_SZ_TOKEN || undefined,
    shopeeXCsrftoken: process.env.SHOPEE_X_CSRFTOKEN || undefined,
    shopeeDNonptchaSync: process.env.SHOPEE_D_NONPTCHA_SYNC || undefined,
    shopeeXSapRi: process.env.SHOPEE_X_SAP_RI || undefined,
    shopeeXSapSec: process.env.SHOPEE_X_SAP_SEC || undefined,
    shopeeUserAgent: process.env.SHOPEE_USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
    shopeeReferer: process.env.SHOPEE_REFERER || 'https://shopee.tw/',
    shopeeAcceptLanguage: process.env.SHOPEE_ACCEPT_LANGUAGE || 'en-GB,en-US;q=0.9,en;q=0.8'
};