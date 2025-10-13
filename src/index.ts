import express, {Request, Response} from 'express';
import axios from 'axios';
import path from 'path';
import { config } from './config';

const app = express();
const port = config.port || 3000;

app.use(express.json());
app.use(express.static('public'));

const getHeaders = () => ({
    'af-ac-enc-dat': '8fe4c1b4e6034362',
    'content-type': 'application/json',
    'cookie': '_gcl_au=1.1.1852991732.1760213278; SPC_F=lUWlFcsW6nobtkT001XoWn32ngIBki06; REC_T_ID=fb589750-a6dd-11f0-8ad4-e26344108951; _QPWSDCXHZQA=c94e6fc8-d270-4f6a-9e27-2f67204f6cfb; REC7iLP4Q=25bcecb0-41d9-47e7-bc5e-a6601263be37; _gid=GA1.2.1318020492.1760213292; SPC_CLIENTID=bFVXbEZjc1c2bm9inqokitlkxfjstmsm; SPC_ST=.eUlNQ1FHcEg4SlNIbDVZNnVk5Q/LnLC8M6zWdNLi85DG+VRwTTWqkclmblK8krO7YczFBuvPOQ5ZdAH0wrKIq2qi8zzGCLSUhF/qoNVPqr3viP7I2CA9aTygjlzQwAmMfNf+Q4fCmztgL4qD463uzqeKemKokCjv4UKXM9ZRkFILE4UhWok72c8ptA8aqC95CasIqSTdE0LYSI53C3Q72Cy4pQQ2GrolhwDnEQa4chk3lNk103BIac9OY4ALtuJq9xYaQkaJmFk1yfMOMuukhg==; SPC_U=1652716567; SPC_R_T_ID=4CygwMQ0+E8Nd9cZlBHyzNm92ZNPGdtdAQK/jR+r86PZxVkUKBzJTUd2N6T2tuNQX5IidIahWIoqvnCdiW4pWRj9vslHGXgIVxw9lJQowCVQHQ5W4Kq1wt9xZ2PYNJS4aQbJ/M9Orj7TGklJh0meEvPnJJ3DW8/qTvLr1pbekmU=; SPC_R_T_IV=cWppdnR0M3JOcEpZSG5MQw==; SPC_T_ID=4CygwMQ0+E8Nd9cZlBHyzNm92ZNPGdtdAQK/jR+r86PZxVkUKBzJTUd2N6T2tuNQX5IidIahWIoqvnCdiW4pWRj9vslHGXgIVxw9lJQowCVQHQ5W4Kq1wt9xZ2PYNJS4aQbJ/M9Orj7TGklJh0meEvPnJJ3DW8/qTvLr1pbekmU=; SPC_T_IV=cWppdnR0M3JOcEpZSG5MQw==; language=en; SPC_SEC_SI=v1-VlgwbXhWc2VOYWtGTHFkTvFGXoU/wRX3xPGSq8ekrDegnK8/5CzveF7vfqSN9DCJpwEYT6gt/GGgv1cW57wqbR7HMi05AEGV0hB8gtqMJmg=; SPC_SC_SESSION=gpByqBe71YDnwSGEilPJgRr2K99Yqk6bxMrvDRBNQBeW+F97sD1Pppd70ffcpByrd00es1y8g1etndLsj22U2oG9xgw7gS15Y8ePEYvpqjogGjl4MUjKZqVX8TPPwZ+/aQt3o32ia2DVpsn0CrLHdCJcPrWEvvyB59st0cw8w69I5BbmomZck5lRWZ88oqXk4UgzNLLqrgvzZKkAeYvHMIsVirzMj9D4oTl1FS2wWP8SUQGJ0NWFKnEJPUltf/rMg53p8HzierHYbHtEI2goDYQ==_1_1652716567; SPC_SC_MAIN_SHOP_SA_UD=0; SPC_STK=3vUa2Ick5+lMM3L7dlcNXOHs4pKHEF5kSL9MC0M7I6uyffvPTwB+ZeY2UAZFOmNycvQISApw4F2AsAwFl/0sjvEAcDAL+346y/fFNd6cvK7PcZ/M4jMDi3CmhZvc2s8WbFte32patamJggel0OvVveZGWr6LDTxqELOWq2N2dVKOcc9MPlXr1Q4k1WLS/nC/dwy+HjcB0UQnse1B63BWS1Q2QwSIU7p1n4RV4D0cgp3EnfKaGcr5kANRj40j6TdWBJx1vQPypnp0pydaOncPLnKTmFTTZdtOtEsg6G9YF4KVjTIbvZZe8D07ASFzmFiGd21BzgYXHwEjX0N5tIh2AvOvCgbIjAn2N8YPBHiFNDmMxTjAIpxhiTgXY1J99mOFbch+pSNcvko1ZfQ+tOojRIzNlEc/4tut5RWa7de2uRCoqDw7HA9IQgVjzDS5ExdTgljjVGIlXy6pZ0osOOwUPKBTE9ACMet+H4wPSoLQXLKVaxIM2XpeW9TO4wOOljnw; SC_DFP=txpxEkIVdrmGPiWftanhXIRlvHclGwnJ; SPC_SI=Yd7kaAAAAABjOElIWnl0QSALFQAAAAAATmtRRWd6dVI=; CTOKEN=Cv5CxKe4EfC62XobhlrIFg%3D%3D; _ga_TD1H325E25=GS2.1.s1760319103$o1$g0$t1760319103$j60$l0$h0; csrftoken=V90aas2ytWVMd8rmQSwq3HtYyZpv7bpu; _sapid=f87b04e9d1cdee81fd26c8ebd711c8136fcc4e4c6bc64e0c94914230; _ga=GA1.1.1326465919.1760213282; SPC_CDS_CHAT=a41e9a49-0808-478f-866e-fab534e2d70f; AC_CERT_D=U2FsdGVkX1+LYFWG38gZnd8fgsH7F4KoovKKmxJlNqbZ5Ykl2hm2G+9r2i75rznDRShnxJgI+36gy+MLvjICFY9BVbdw+UXShAV8RNzon8ANMy0hbdg/XUJ8dOoU46qa8jcyxJXUbXyutIGcFVL+gbZSUC1rYI1pGD0wv5XLhcNB1TGj7kNfpxp2MbwwluL464A/7/6CoWfS+jxsuP24GAQQFe8fyoPLZqSWbOJdhECtoH9EOt/ugW12EhNHc9fvBbNuBSYQVnOpQF/xsmKEWZZRE2NX58rZB3aAtCi6xfqwXKtZ0x44okNT1dZx92neXHAjJ2l8fVO3pRvywXHXmjCFLSR24IwNeCX0spaa2VDxMrgSC4dioGmMlZzqLfIJ8+jfSZyOUoi3gZ9u0YcjBbuzcVzk84yiGpVpnFa+M7elyhyO2BU8Vo3Knm8iacX0FZ+3q6CRteP0nRk4M5LqjU4DD7jP2bOga/ROKOmGUAveLy7Om6LI/GzS9ASBiWfu+u8ZAUDyLFrEuAIxEFhkMM3aXqU8MP41AmoX0NP0Vgxlgox0oufKP6M+0UI+bV+5FyKCbplKihThsI57+TxWJt/HASqZT1RuZ1g/7u5hcJWOEwn4V4gEMR2Qui5vArUIIDw6/UIBt+1t5iPsLPQN84oAyeeQ18x/XQZxQDkRPJVdAy2QqV2UTXuJhN9OnhBbeXNx9kxFOBxXTp/vQj5TijnlBXZ+FOxWqp1t1nPcFH/cOJCg2Ek1ePEGwqqFZzxOHnCFEmJdiqMznpXmKCqVdfmtMmfKitQSU3aFd7AhkU8KwwZnSOU1/CRykFkh6YAgDS9Iwxr7CYDFN98xvwyIPhT8KWoRMJatCaKzF/GztvDxB5sjSgDcUdZQvAHfhv4bmkuQ3zULFzYw6isNKnDyPjxgkW6sLvu4MDfTGxmoCITCyPooHLtwRUlBc3rXgEq9VBiqBQLXFkXn/9Uth0Da79vvJeRrK3AuWbIrZaSljN9cP3H7DO9RodGirUZK1gsEUmsC0mMG6zetAfFFMxxzrcrbfPhQgUUuShSozupWmLGX+/ila8eI+/ccYqmx0l21yBTu2fG+cT4wGu3XKSYQBX85+9IL4+RuMnFTFuKVCdc=; _ga_E1H7XE0312=GS2.1.s1760357475$o11$g1$t1760357490$j45$l1$h1277203981; shopee_webUnique_ccd=3jXPDmUrugU8o82ylB7Kfg%3D%3D%7CA7eE07jzjVfByu%2BIMKN%2BapZ8flTo7r9qZymzSjw0AO9qSiIX62neUVrDPwtBZ2F%2FOLMD%2BhOovMS%2Bdg%3D%3D%7CAQYwSPYx4cq7J4QL%7C08%7C3; ds=9edc23375d5cafe5e3ba5022c7f05193; SPC_EC=.cXlDNmNCZVRMbndqNEVlRGGt/LJnrXCUDro4XzVDNnTesmIGUVcDY7ZOBvewlb4EcGHbrEGtM8t5/+b8Pugvhc1iJoUW0Zw1+2ghr7oEfKQheMLqKm+F7VslEu4Q1WYw0Bg3XFVoNh1tmEOOJhje0A8FrPkkYwE4DR3NSdBv51n1Y1i03Li0pdkSj/wAoXny+Py8lWwTHZI9bxHEDJemfO4fsnL1kyxhNRbRJQNao+tKApqA3AHCs152CdaKryyBpNT0eMk3l01RHCe1YFPaiw==',
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
            
            return {
                item_id: itemData.itemid,
                shop_id: itemData.shopid,
                name: displayAsset?.name || '',
                description: '', // Not available in this API structure
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
        });
}

async function scrapeShopee(collectionId: string = '8835424'): Promise<any> {
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
        const collectionId = req.query.collection_id as string || '8835424'; // Default collection
        const data = await scrapeShopee(collectionId);
        res.json(data);
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