import express, {Request, Response} from 'express';
import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { RateLimiter } from 'limiter';
import { config } from './config';

const app = express();
const port = config.port || 3000;

app.use(express.json());

const limiter = new RateLimiter({ tokensPerInterval: 100, interval: 'minute' });

// Here I am assuming that you are using rotating proxies
const proxyConfig = {
    host: config.proxyHost,
    port: config.proxyPort,
    auth: {
        username: config.proxyUsername,
        password: config.proxyPassword
    }
};

// If you are using a single proxy, you can remove the proxyConfig object and use this instead:
// consut proxyList = [
//     {
//         host: 'proxy1.example.com',
//         port: 1080,
//         auth: {
//             username: 'user1',
//             password: 'pass1'
//         }
//     },
//     {
//         host: 'proxy2.example.com',
//         port: 1080,
//         auth: {
//             username: 'user2',
//             password: 'pass2'
//         }
//     }
// ];

// const getRandomProxy = () => {
//     return proxyList[Math.floor(Math.random() * proxyList.length)];
// };

// const proxy = getRandomProxy();

// const proxyConfig = {
//     host: proxy.host,
//     port: proxy.port,
//     auth: {
//         username: proxy.auth.username,
//         password: proxy.auth.password
//     }
// };


const getHeaders = () => ({
    'accept': 'application/json',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36`,
    'x-api-source': 'pc',
    'x-requested-with': 'XMLHttpRequest',
    'x-shopee-language': 'zh-Hant',
    'x-sz-sdk-version': '1.12.18'
});

async function scrapeShopee(shopId: string, itemId: string, retries: number = 3): Promise<any> {
    try {
        await limiter.removeTokens(1);

        const url = `https://shopee.tw/api/v4/pdp/get_pc?item_id=${itemId}&shop_id=${shopId}&tz_offset_minutes=480&detail_level=0`;


        let agent = new SocksProxyAgent(
            `socks5://${proxyConfig.auth.username}:${proxyConfig.auth.password}@${proxyConfig.host}:${proxyConfig.port}`
        );

        if (proxyConfig.host === undefined || proxyConfig.port === undefined || proxyConfig.auth.username === undefined || proxyConfig.auth.password === undefined) {
            throw new Error('Proxy configuration is missing');
        }

        const response = await axios.get(url, {
            headers: getHeaders(),
            httpAgent: agent,
            httpsAgent: agent,
            withCredentials: true,
            timeout: 10000,
        });

        return response.data;
    } catch (error: any) {
        if (error.response?.status === 429 || error.response?.status === 403) {
            throw new Error('Blocked by Shopee');
        }

        if (retries > 0) {
            console.log(`Retrying... Attempts left: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return scrapeShopee(shopId, itemId, retries - 1);
        }
        throw error;
    }
}

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello from Abhishek'
    });
});

app.get('/shopee', async (req: Request, res: Response) : Promise<any> => {
    const { shopId, itemId } = req.query;

    if (!shopId || !itemId) {
        return res.status(400).json({
            error: 'Missing required parameters: shopId and itemId'
        });
    }

    try {
        const data = await scrapeShopee(
            shopId as string,
            itemId as string
        );
        res.json(data);
    } catch (error: any) {
        console.error('Scraping error:', error);
        res.status(500).json({
            error: 'Failed to fetch product data',
            details: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});