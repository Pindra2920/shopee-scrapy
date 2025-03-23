import express, {Request, Response} from 'express';
import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { RateLimiter } from 'limiter';
import { config } from './config';

const app = express();
const port = config.port || 3000;

app.use(express.json());

const limiter = new RateLimiter({ tokensPerInterval: 100, interval: 'minute' });

const proxyConfig = {
    host: config.proxyHost,
    port: config.proxyPort,
    auth: {
        username: config.proxyUsername,
        password: config.proxyPassword
    }
};


const proxyList: string[] = [];

const getRandomProxy = () => {
    const randomIndex = Math.floor(Math.random() * proxyList.length);
    const proxy = proxyList[randomIndex];
    return proxy;
}


const getHeaders = () => ({
    'accept': 'application/json',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36`,
    'x-api-source': 'pc',
    'x-csrftoken':'NSodsFBWKpDOnGBWYScpPMQYBXHK0THS',
    'x-requested-with': 'XMLHttpRequest',
    'x-shopee-language': 'zh-Hant',
    'x-sz-sdk-version': '1.12.18'
});

async function scrapeShopee(shopId: string, itemId: string, retries = 3): Promise<any> {
    try {
        await limiter.removeTokens(1);

        const url = `https://shopee.tw/api/v4/pdp/get_pc?item_id=${itemId}&shop_id=${shopId}&tz_offset_minutes=480&detail_level=0`;


        let agent = new SocksProxyAgent(
            `socks5://${proxyConfig.auth.username}:${proxyConfig.auth.password}@${proxyConfig.host}:${proxyConfig.port}`
        );

        if (proxyConfig.host === undefined) {
            console.log('No proxy configured. Using random proxy from list.');
            agent = new SocksProxyAgent(`socks5://${getRandomProxy()}`);
        }

        const response = await axios.get(url, {
            headers: getHeaders(),
            httpAgent: agent,
            httpsAgent: agent,
            timeout: 10000,
        });

        return response.data;
    } catch (error) {
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
        message: 'Hello from Abhishek '
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