import express, {Request, Response} from 'express';
import axios, { AxiosRequestHeaders } from 'axios';
import path from 'path';
import { config } from './config';

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(express.static('public'));

const getHeaders = () => ({
    'af-ac-enc-dat': '8fe4c1b4e6034362',
    'content-type': 'application/json',
    'cookie': '_gcl_au=1.1.1852991732.1760213278; SPC_F=lUWlFcsW6nobtkT001XoWn32ngIBki06; REC_T_ID=fb589750-a6dd-11f0-8ad4-e26344108951; _QPWSDCXHZQA=c94e6fc8-d270-4f6a-9e27-2f67204f6cfb; REC7iLP4Q=25bcecb0-41d9-47e7-bc5e-a6601263be37; _gid=GA1.2.1318020492.1760213292; SPC_CLIENTID=bFVXbEZjc1c2bm9inqokitlkxfjstmsm; SPC_ST=.eUlNQ1FHcEg4SlNIbDVZNnVk5Q/LnLC8M6zWdNLi85DG+VRwTTWqkclmblK8krO7YczFBuvPOQ5ZdAH0wrKIq2qi8zzGCLSUhF/qoNVPqr3viP7I2CA9aTygjlzQwAmMfNf+Q4fCmztgL4qD463uzqeKemKokCjv4UKXM9ZRkFILE4UhWok72c8ptA8aqC95CasIqSTdE0LYSI53C3Q72Cy4pQQ2GrolhwDnEQa4chk3lNk103BIac9OY4ALtuJq9xYaQkaJmFk1yfMOMuukhg==; SPC_U=1652716567; SPC_R_T_ID=4CygwMQ0+E8Nd9cZlBHyzNm92ZNPGdtdAQK/jR+r86PZxVkUKBzJTUd2N6T2tuNQX5IidIahWIoqvnCdiW4pWRj9vslHGXgIVxw9lJQowCVQHQ5W4Kq1wt9xZ2PYNJS4aQbJ/M9Orj7TGklJh0meEvPnJJ3DW8/qTvLr1pbekmU=; SPC_R_T_IV=cWppdnR0M3JOcEpZSG5MQw==; SPC_T_ID=4CygwMQ0+E8Nd9cZlBHyzNm92ZNPGdtdAQK/jR+r86PZxVkUKBzJTUd2N6T2tuNQX5IidIahWIoqvnCdiW4pWRj9vslHGXgIVxw9lJQowCVQHQ5W4Kq1wt9xZ2PYNJS4aQbJ/M9Orj7TGklJh0meEvPnJJ3DW8/qTvLr1pbekmU=; SPC_T_IV=cWppdnR0M3JOcEpZSG5MQw==; language=en; SPC_SC_SESSION=gpByqBe71YDnwSGEilPJgRr2K99Yqk6bxMrvDRBNQBeW+F97sD1Pppd70ffcpByrd00es1y8g1etndLsj22U2oG9xgw7gS15Y8ePEYvpqjogGjl4MUjKZqVX8TPPwZ+/aQt3o32ia2DVpsn0CrLHdCJcPrWEvvyB59st0cw8w69I5BbmomZck5lRWZ88oqXk4UgzNLLqrgvzZKkAeYvHMIsVirzMj9D4oTl1FS2wWP8SUQGJ0NWFKnEJPUltf/rMg53p8HzierHYbHtEI2goDYQ==_1_1652716567; SPC_SC_MAIN_SHOP_SA_UD=0; SPC_STK=3vUa2Ick5+lMM3L7dlcNXOHs4pKHEF5kSL9MC0M7I6uyffvPTwB+ZeY2UAZFOmNycvQISApw4F2AsAwFl/0sjvEAcDAL+346y/fFNd6cvK7PcZ/M4jMDi3CmhZvc2s8WbFte32patamJggel0OvVveZGWr6LDTxqELOWq2N2dVKOcc9MPlXr1Q4k1WLS/nC/dwy+HjcB0UQnse1B63BWS1Q2QwSIU7p1n4RV4D0cgp3EnfKaGcr5kANRj40j6TdWBJx1vQPypnp0pydaOncPLnKTmFTTZdtOtEsg6G9YF4KVjTIbvZZe8D07ASFzmFiGd21BzgYXHwEjX0N5tIh2AvOvCgbIjAn2N8YPBHiFNDmMxTjAIpxhiTgXY1J99mOFbch+pSNcvko1ZfQ+tOojRIzNlEc/4tut5RWa7de2uRCoqDw7HA9IQgVjzDS5ExdTgljjVGIlXy6pZ0osOOwUPKBTE9ACMet+H4wPSoLQXLKVaxIM2XpeW9TO4wOOljnw; SC_DFP=txpxEkIVdrmGPiWftanhXIRlvHclGwnJ; SPC_SI=Yd7kaAAAAABjOElIWnl0QSALFQAAAAAATmtRRWd6dVI=; CTOKEN=Cv5CxKe4EfC62XobhlrIFg%3D%3D; _ga_TD1H325E25=GS2.1.s1760319103$o1$g0$t1760319103$j60$l0$h0; csrftoken=MAH7anJ7Q5gE3RCWoun4wi42IkdtGhpu; _sapid=f87b04e9d1cdee81fd26c8ebd711c8136fcc4e4c6bc64e0c94914230; SPC_CDS_CHAT=8c4e9571-5446-4df4-beac-c7b12684f1d8; SPC_SEC_SI=v1-b1NzNm1NcGU1VDY0TnpJRC0l/pAIgk0VQKCwzu+9SFht9fGni6yYQk2q3CEUdRHcAsk+c8vsN7/FIT0XThFLnEtx99KGEham/KENJ65hpgM=; _ga=GA1.1.1326465919.1760213282; AC_CERT_D=U2FsdGVkX1819zv8DpdjxEJnSCd8UELZLzcV4E4CEFXrLl+11Vc2937Q2Ws64Ia4Jsyw4GruqOx44V5EcZzpJy77me7LnhYFRdiHNe99FNP5MwgXCns06ISumz68X6CwIfYZ3lNwg1MFvG1zFm92cmHxZcZcVuwypnqBHF5D9VL68SlgW4s7yYt650qTJWWzgtmfPfXj9uJ1DiDav4GDsE8W/VPfgkk6VN2jKKE2303GgKFpkfPh9JuyuyGoWABLrefX+VIK46cR3TUQwpEn4gB/x0Cn3gxcZJKWmFtaLZqExrVYOh5/AOOls4sj5JhKcfcog7JGa1+h0CEb4lCT14uH5yilmHUDZoW3fWwkcROPgXQ3IyyUQOWTFg1auOz9dMvOdf4wvWVlP4ms3LefJRUk19ZkNDjobM/6men+7MeV6T4ApBiVcnPdCeje6zXOFBZtbGmBgD5WgWJa6HEDwWYNo4Aaq7XkzFMiHRLyXD69wOkwA5f/ziYN2n/5iYLpMOFCGwGcb9vF9TnriUom8zAj+Apoij7BZSIqRgG7xdT1ldDzMavKQHyMf6gJoycZ4al8YgeYcv2WaZx6kW+D1TBuJiaxFL5b8eq5Pbs0MgBwunP4HIkhtF0pokHyA6k3sbncvgcLtaoUVdQ0OSGzodQ4wVLuFH7mcWeqxGzZQBj2F5aqUASI7k4L5YXx2Bupnz8Y3BRyW53lx9uYy+FePqWuYbvuHxCuxCVxDvPm5R4n5g6mmC1Bu/TbZ29d4Qlo+PCkI0BUbYSOrhw19CwKtCzQrVZRzbtPWx27W0zk049kiQt48KIK/Ero+l5e3kjBhjB7MJjLckgANTM1j4pcSGP2aLTrawRnLn3JB2Y+EXO85rWHJst9YbVSpa7FLAEzgn/JsgtexWMDwjc2mwsNntljezqQj4h6givcs9+hNVLD8WqitsrSMbRGh6CPP4BBdIDqsZrTz7y0WkKf56+QTid5WazcW9wn1HBjJgVR0DapLM06CQGEBbsVba/ln2mvczgexKq6mj+3ng31xsNc8HLJh2VGNxejRtp3edfuz8ZIeajQtSluG3L8TguY9FP9+2R96X92JDa2SdN/A3PIkntfY2HkVcQ0c7FosDT5ntE=; shopee_webUnique_ccd=jWgC0ZghOjhb74zCYsDbFw%3D%3D%7CK7aE07jzjVfByu%2BIMKN%2BapZ8flTo7r9qZymzSjxCV9pqSiIX62neUVrDPwtBZ2F%2FOLMD%2BhOovMS%2Bdg%3D%3D%7CAQYwSPYx4cq7J4QL%7C08%7C3; ds=14d1aa73967803c54d9562bdbed13905; AMP_TOKEN=%24RETRIEVING; _ga_E1H7XE0312=GS2.1.s1760536849$o19$g1$t1760536885$j24$l1$h1800884862; SPC_EC=.OHF3UHJwWDhMODZHbXNUeUms7F1KPw36o+2VE0yhxaRcoG12cks9x2OEXf7swKm6ojEO6y2L0iE08K+KF+6NO4ZtGuBAuH5b/6Z7xs+keiqCiJCNnklfYGzAMCVaheBu62CgjfHbo6fa9VQd4dQsGTI8qMbjHPE+wxFGlNTUEogNf2s2kmQv4n/c5qE7vm8VVYp3BhhA/BxoKC0vjScCQBbmmZZMQBJF3eqqNxanwAmtUzlScxeZI7K88TlPFS5Q5LlmdWzwGnkDeXliZfhgsg==',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
});

interface ProductData {
    item_id: number;
    shop_id: number;
    name: string;
    description?: string;
    category_id: number;
    brand?: string;
    price: number;
    original_price: number;
    historical_sold: number;
    stock: number;
    ratings: number;
    review_count: number;
    attributes?: any[];
    images: string[];
    video_info?: any;
    warranty?: string;
    shipping_details?: any;
    variations?: any[];
    promotion_info?: any;
    seller_name: string;
    shop_location: string;
    logistics_info?: any;
    is_official_shop: boolean;
    tags?: string[];
    min_order?: number;
    item_status?: string;
    price_guarantee?: boolean;
    sold: number;
    update_time?: number;
    flash_sale_info?: any;
    liked_count: number;
}

// Heuristics: infer brand and a plain description from the product name when API does not provide them
function inferBrandAndDescriptionFromName(name: string): { brand: string; description: string } {
    if (!name) return { brand: '', description: '' };

    const original = name;
    let brand = '';

    // Prefer brand inside 【...】
    const bracketMatch = original.match(/【([^】]{2,40})】/);
    if (bracketMatch) {
        brand = bracketMatch[1].trim();
    }

    // Fallback: take brand inside (...) if looks like a name (letters or Han)
    if (!brand) {
        const parenMatch = original.match(/\(([^)\n]{2,40})\)/);
        if (parenMatch && /[A-Za-z\u4e00-\u9fff]/.test(parenMatch[1])) {
            brand = parenMatch[1].trim();
        }
    }

    // Another fallback: first 1-2 words before a keyword or number
    if (!brand) {
        const cleaned = original
            .replace(/【[^】]*】/g, ' ')
            .replace(/\([^)]*\)/g, ' ')
            .replace(/[\[\]【】]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        const tokens = cleaned.split(/\s+/);
        const stopIdx = tokens.findIndex(t => /\d/.test(t) || t.length <= 1);
        const take = stopIdx > 0 ? Math.min(stopIdx, 2) : Math.min(tokens.length, 2);
        brand = tokens.slice(0, take).join(' ').trim();
    }

    // Build description by removing found brand markers from name
    let description = original
        .replace(/【[^】]*】/g, ' ')
        .replace(/\([^)]*\)/g, ' ')
        .replace(/[\[\]【】]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // If brand still appears as prefix, drop it once
    if (brand && description.toLowerCase().startsWith(brand.toLowerCase())) {
        description = description.slice(brand.length).trim();
    }

    // Keep brand within reasonable size
    if (brand.length > 40) brand = brand.slice(0, 40).trim();

    return { brand, description };
}

function processProductData(rawData: any): ProductData[] {
    if (!rawData) {
        return [];
    }

    return rawData
        .filter((item: any) => item.customised_item_card?.item_data)
        .map((item: any) => {
            const itemData = item.customised_item_card.item_data;
            const displayAsset = item.customised_item_card.item_card_displayed_asset;
            const labels = displayAsset?.promotion_label_list || [];
            
            const name = displayAsset?.name || '';
            const inferred = inferBrandAndDescriptionFromName(name);
            return {
                item_id: itemData.itemid,
                shop_id: itemData.shopid,
                name,
                description: '', // we will fill below if empty
                category_id: itemData.catid,
                brand: itemData.global_brand?.display_name || '',
                price: itemData.item_card_display_price?.price || 0,
                original_price: itemData.item_card_display_price?.strikethrough_price || itemData.item_card_display_price?.price || 0,
                historical_sold: 0, // Not available in this API
                stock: itemData.is_sold_out ? 0 : 1, // Approximate based on sold_out status
                ratings: itemData.item_rating?.rating_star || 0,
                review_count: itemData.item_rating?.rating_count?.reduce((a: number, b: number) => a + b, 0) || 0,
                attributes: itemData.label_ids || [],
                images: displayAsset?.images || [],
                video_info: itemData.video_info_list || null,
                warranty: null, // Not available in this API
                shipping_details: {
                    free_shipping: false, // Not available in this API
                    shop_location: itemData.shop_data?.shop_location || ''
                },
                variations: itemData.tier_variations || null,
                promotion_info: {
                    discount: itemData.item_card_display_price?.discount || 0,
                    show_discount: itemData.item_card_display_price?.discount > 0,
                    voucher_info: null, // Not available in this API
                    promotion_labels: labels.map((label: any) => ({
                        type: label.type,
                        text: label.data?.text,
                        name: label.data?.text
                    }))
                },
                seller_name: itemData.shop_data?.shop_name || '',
                shop_location: itemData.shop_data?.shop_location || '',
                logistics_info: {
                    can_use_cod: false, // Not available in this API
                    estimated_delivery_time: null // Not available in this API
                },
                is_official_shop: itemData.shopee_verified || false,
                tags: itemData.label_ids?.map((id: number) => id.toString()) || [],
                min_order: 1, // Default minimum order
                item_status: itemData.is_sold_out ? 'sold_out' : 'active',
                price_guarantee: false, // Not available in this API
                sold: 0, // Not available in this API
                update_time: Date.now(),
                flash_sale_info: null, // Not available in this API
                liked_count: itemData.liked_count || 0
            };
        }).map((p: ProductData) => {
            if (!p.brand) {
                const inferred = inferBrandAndDescriptionFromName(p.name);
                p.brand = inferred.brand || p.brand;
                if (!p.description) p.description = inferred.description;
            } else if (!p.description) {
                const inferred = inferBrandAndDescriptionFromName(p.name);
                p.description = inferred.description;
            }
            return p;
        });
}

async function fetchItemDetail(itemId: number, shopId: number): Promise<{ description: string; brand: string }> {
    try {
        const url = `https://shopee.tw/api/v4/item/get?itemid=${itemId}&shopid=${shopId}`;
        const response = await axios.get(url, {
            headers: getHeaders(),
            withCredentials: true,
            timeout: 10000,
        });
        const d = response.data?.data || {};
        return {
            description: d.description || '',
            brand: d.brand?.display_name || d.global_brand?.display_name || '',
        };
    } catch (e) {
        return { description: '', brand: '' };
    }
}

async function scrapeShopee(collectionId: string = '8835490'): Promise<any> {
    try {
        // const url = `https://shopee.tw/api/v4/collection/get_items?card_set_name=Microsite%20ATC%20Card&collection_id=6132194&limit=150&need_customised_item_card=true&show_collection_info=true&source=1`;
        // const url = `https://shopee.tw/api/v4/shop/rcmd_items?by=relevancy&card_set_name=Microsite%20ATC%20Card&collection_id=${collectionId}&item_order=0&limit=150&match_id=${collectionId}&need_customised_item_card=true&newest=0&offset=0&order=desc&page_type=collection&scenario=PAGE_COLLECTION&source=2&version=2`;
        const url = `https://shopee.tw/api/v4/collection/get_items?by=relevancy&card_set_name=Microsite%20ATC%20Card&collection_id=${collectionId}&item_order=0&limit=150&match_id=${collectionId}&need_customised_item_card=true&newest=0&offset=0&order=desc&page_type=collection&scenario=PAGE_COLLECTION&source=2&version=2`;

        const response = await axios.get(url, {
            headers: getHeaders(),
            withCredentials: true,
            timeout: 10000,
        });
        // This is the response
        const items = response.data.data.items;
        const processedData = processProductData(items);
        return {
            success: true,
            total_products: processedData.length,
            products: processedData,
            collection_id: collectionId
        };
    } catch (error: any) {
        console.log('Error scraping Shopee:', error);
        return {
            success: false,
            error: error.message,
            products: [],
            collection_id: collectionId
        };
    }
}

// Serve the main HTML page
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/shopee', async (req: Request, res: Response) : Promise<any> => {
    try {
        const collectionId = req.query.collection_id as string | undefined;
        const shopId = req.query.shop_id as string | undefined;
        const page = req.query.page ? Number(req.query.page) : 0;
        const tab = req.query.tab ? Number(req.query.tab) : 0;
        const sortBy = (req.query.sortBy as string) || 'pop';
        const includeDetails = (req.query.include_details as string) === 'true';

        if (shopId) {
            // POST shop rcmd_items
            const url = 'https://shopee.tw/api/v4/shop/rcmd_items';
            const payload = {
                page,
                tab,
                sortBy,
                match_id: Number(shopId),
                limit: 150,
                need_next_info: true,
                need_customised_item_card: true,
                scenario: 'shop_category_landing',
                page_type: 'shop_category_landing'
            };
            const response = await axios.post(url, payload, {
                headers: getHeaders(),
                withCredentials: true,
                timeout: 20000
            });
            const itemCards = response.data?.data?.centralize_item_card?.item_cards || [];

            // Map cards to our shape
            let products: ProductData[] = itemCards.map((item: any) => {
                const asset = item.item_card_displayed_asset;
                const labels = asset?.promotion_label_list || [];
                const name = asset?.name || '';
                const inferred = inferBrandAndDescriptionFromName(name);
                const product: ProductData = {
                    item_id: item.itemid,
                    shop_id: item.shopid,
                    name,
                    description: '',
                    category_id: item.catid,
                    brand: item.global_brand?.display_name || '',
                    price: item.item_card_display_price?.price || 0,
                    original_price: item.item_card_display_price?.strikethrough_price ?? item.item_card_display_price?.price ?? 0,
                    historical_sold: item.item_card_display_sold_count?.historical_sold_count || 0,
                    stock: item.is_sold_out ? 0 : 1,
                    ratings: item.item_rating?.rating_star || 0,
                    review_count: Array.isArray(item.item_rating?.rating_count) ? item.item_rating.rating_count.reduce((a: number, b: number) => a + b, 0) : 0,
                    attributes: item.label_ids || [],
                    images: asset?.images || (asset?.image ? [asset.image] : []),
                    video_info: undefined,
                    warranty: undefined,
                    shipping_details: { free_shipping: false, shop_location: item.shop_data?.shop_location || '' },
                    variations: item.tier_variations || null,
                    promotion_info: {
                        discount: item.item_card_display_price?.discount || 0,
                        show_discount: (item.item_card_display_price?.discount || 0) > 0,
                        voucher_info: null,
                        promotion_labels: labels.map((l: any) => ({ type: l.type, text: l.data?.text, name: l.data?.text }))
                    },
                    seller_name: item.shop_data?.shop_name || '',
                    shop_location: item.shop_data?.shop_location || '',
                    logistics_info: { can_use_cod: false, estimated_delivery_time: null },
                    is_official_shop: item.shopee_verified || false,
                    tags: (item.label_ids || []).map((id: number) => id.toString()),
                    min_order: 1,
                    item_status: item.is_sold_out ? 'sold_out' : 'active',
                    price_guarantee: false,
                    sold: 0,
                    update_time: Date.now(),
                    flash_sale_info: undefined,
                    liked_count: item.liked_count || 0
                };
                if (!product.brand) product.brand = inferred.brand;
                if (!product.description) product.description = inferred.description;
                return product;
            });

            if (includeDetails) {
                products = await Promise.all(products.map(async (p: ProductData) => {
                    const d = await fetchItemDetail(p.item_id, p.shop_id);
                    return { ...p, description: d.description || p.description, brand: d.brand || p.brand };
                }));
            }

            return res.json({ success: true, total_products: products.length, products, shop_id: shopId });
        }

        if (collectionId) {
        const data = await scrapeShopee(collectionId);
            return res.json(data);
        }

        return res.json({ success: false, error: 'Missing shop_id or collection_id', products: [] });
    } catch (error: any) {
        console.error('Scraping error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product data',
            details: error.message,
            products: []
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Open your browser and visit: http://localhost:${port}`);
});
