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
    'cookie': 'SPC_SI=uc3saAAAAABLWjlwc3BYSwunBQAAAAAAZGY5TUE0emI=; SPC_SEC_SI=v1-dTJSNkVvZUt1WW9rMVU1VCbwMFXTIe3eOH68kGiR4pgwuTKKYP4qmGmYg0UNRps5vG7q1COdE2eP2msFgWBFTCpnoF85SN+ornhApbYhG3A=; SPC_F=ga2Z4CrhflD0FM8ve6AWgSu11IIA0nYV; REC_T_ID=ad8f5611-a881-11f0-8077-26c435c93cc3; SPC_R_T_ID=1PDm8GfO7XTu0UpvEjUTFuWu50hHID25sXczihft0bdzD/tRCPw3JbQMHtQtkH3Ko6seSwaNKjg4sMwTAw4spEepPyPVJktIuBVpMoe1jlFi6W9uUyF3XickevNbhi5yKEG39DGkliYnEC85EgYugzzrVwqwLk1wXUUyVE+3GX0=; SPC_R_T_IV=ZXdjSVNrc3VpeTdiRWJLNw==; SPC_T_ID=1PDm8GfO7XTu0UpvEjUTFuWu50hHID25sXczihft0bdzD/tRCPw3JbQMHtQtkH3Ko6seSwaNKjg4sMwTAw4spEepPyPVJktIuBVpMoe1jlFi6W9uUyF3XickevNbhi5yKEG39DGkliYnEC85EgYugzzrVwqwLk1wXUUyVE+3GX0=; SPC_T_IV=ZXdjSVNrc3VpeTdiRWJLNw==; csrftoken=lRID49R7KvYfJQJ1LGDXn8IXbT64eiJe; _sapid=8f393d64cc40d00c8a64f1669fdf5f3b32be7d162e5b3b2afa3bacdb; _gcl_au=1.1.171438551.1760393539; _QPWSDCXHZQA=ab29637a-4c66-458a-b2b1-8e5a7ec06ffa; REC7iLP4Q=46e3dd81-e639-4d45-b025-515056ba474d; _fbp=fb.1.1760393541184.134150216241736235; AMP_TOKEN=%24NOT_FOUND; _gid=GA1.2.2070508770.1760393549; shopee_webUnique_ccd=8zAoFGkDRr75JJgQQbLi6Q%3D%3D%7CGKVX5PAzNhWbZdrQU2E3M89Tu11nXfzbPj1VxK7KqLniLUYP8PfIz6%2FSXqtdyeGeMlP3TWWtnP2%2FPw%3D%3D%7CcJhBdTNDMRZjjpWD%7C08%7C3; ds=5a11ac2dc2d33c6a3335ea488fe9a047; _ga=GA1.1.1542243922.1760393546; _ga_E1H7XE0312=GS2.1.s1760393545$o1$g1$t1760394944$j60$l0$h1572595528SPC_F=fwz2TGu57uUd62aBx4oDgn57zbxmDQR2; REC_T_ID=dbf82ffd-a6dd-11f0-85af-9eed72e9bf8c; csrftoken=ms9KNNkD5Vy1HZF3ALm9AolMPKThEhkp; _sapid=01e0ac3aec58465204bd60384bc74093e057ef8680c880e534e934e8; _gcl_au=1.1.721646068.1760213230; _QPWSDCXHZQA=27f35b0d-c8d3-4236-effd-070b9e820850; REC7iLP4Q=bbdba1fd-ea0c-4950-a36d-49c62d015fa1; SPC_SI=fc3saAAAAABGUmw1SGh5NETNAAAAAAAAR2hVd3NiZnA=; SPC_SEC_SI=v1-UWVJQVIwZloyQ0RMTnhIcHvKk2qe0I39w6XC0e0++8NbiFykGda0j3xn9Yhs3rI9wHTpGpbBZEftdvdCuJem4DDXOt03gzZtQWFtPKDpBtk=; _gid=GA1.2.650290454.1760356406; language=en; SPC_CLIENTID=Znd6MlRHdTU3dVVklwkfdbwvsvzkhqet; SPC_U=1654141878; SPC_R_T_ID=Mv0RZYxSQ6keVMbifNzd7zuOgoUx1LqOIT54P67qJdsUwd90FzFHkQ7gV85r2oXNk22K4bFu8IJmWVAu7PipUx8tR4b416b3IB4Z52nCPltP7r7YQjR24m5J0uFVO/wzJIkgMsC2+Vi7/NKYLQ6z/YRVKxVlX+cEqml0krWMXTg=; SPC_R_T_IV=bnZUYmlyNzFLS3NzU1VXRw==; SPC_T_ID=Mv0RZYxSQ6keVMbifNzd7zuOgoUx1LqOIT54P67qJdsUwd90FzFHkQ7gV85r2oXNk22K4bFu8IJmWVAu7PipUx8tR4b416b3IB4Z52nCPltP7r7YQjR24m5J0uFVO/wzJIkgMsC2+Vi7/NKYLQ6z/YRVKxVlX+cEqml0krWMXTg=; SPC_T_IV=bnZUYmlyNzFLS3NzU1VXRw==; SPC_CDS_CHAT=69e8eb2b-9bc1-4675-9317-6751bdbef3d8; SPC_ST=.UDYwZUIwOEdCQ1dDWEtsMN6LnNDxnrjHA1Yufipq7FmFlCREGPMdSWpa95HMDumR+WNulWTHRMwxxTStATM4aD5IucIhuNvpvZM9emXsaeq1aMZ8UwIArYz8KRMFT0llQ+tJ+Zb/RGAdYJ+u5SxXW3P39VsXyWS46qrhjs3ksK7ANnrPsBNXo3qcBnlfXtUNaEdQOd8k6vWOKcGdG7DxXu971o+yIG7RbsiH5dtv7vaTtdUX5JPsIlR4IU+7jU2sVpwKOXhrg9agOEBcIMIMpg==; _ga=GA1.1.1546264077.1760213238; AC_CERT_D=U2FsdGVkX1+5/Cy9zQuv8dtM4LzRYwVtPbP7GO7wH5ubxy0rrHj1ALPpp7EJswliyVXC716farMjJwofraiO4qc8VaYWMa3rjNUsP+MN4nKWlri5shE+CrdKpdSk3345p5yJd9beZXwJr1macYhmXWz+n/CV0+6xQlKUlsPmJws1LIKfjDxsBhByvIx6KCdv8PT8ME7177zU5cUMGqi1qXntNvzTUN0PrMU8GSQEt2dTTl92tZG/3IgQvU4nnxDCJA7NmoC+K/RhlgbrqiHOS/OHM1nvlwEVivmwRYZvMVMyG6Gcy3XXV56SMV2TCNLgmIQh5JhZY0qUSzykgsCInriqg68u2slueRrH5RVW2Zum6zKKxMrwRa5obik3QFpDv73i3jrFT6OBSRU0bQ0cFLbENLsElhKR2qIoHUjtY8uzT5ZzQyD+RbPK1v9AiR+dgA/a42qj8+FifIw9XBBlArt/VldqmlF0kxs8pPWCBoHG7wRdw9YMTPtgZjT5a0GAYimmYUYefZEs7TBciXofpfITcjeGOmb6wu/5299h1yHOO70XT5c7xzyK0I55xlQ4trDVpQFJ0FP5noPY4JkN+/c/x3tz4C/LpFPNL3CpKMfL0l8PdXqiPNI8Oe+S3cSWA7ULG7X+2N7oLfIichAIk6P9KapPAEhWHnwNxvhgduBR8yTOQ79EMeH35XlWbFvl/IXnpw1QTQO+wn6pNKpoQLGfsQWepI0c5P9O6ZhnOL2FWl8YMs/EICabjdD9lWf8IMDBwDA7dtAeZRQyP3MLOJaZdwet+05YP6Hnc8ffW1idFwVyRhXJbQmcwuh1f0BRXIRuGxMS5SUokT57jzuFDrj978+wtkCPfPoy7PddJamtnvXjS4p3KGv4ugNgUL6Tdq2rzPUDwBlsII5XOXCdRIHgcCkDbXYN/n7zP/c6osy44hVsg0fNuMTWaTXPzNZ0jFxBsP1v7tXqAsHTDNU7pbuXaBBOnCK841mtBKleTq0wpdlNmxiRsgxAHeMjpnObfViEEI0jPRq/GL2hgKwI7Md4GbJW3Bk1P4N2CroePkfYk96f8EFDhh9Nk4md/ovDeKIFGfxRVbo3xiwGtVgu6qOVm/5s60Wboh+A5IEu2+0=; shopee_webUnique_ccd=sO55RkPK8WaqW9cbri9i1Q%3D%3D%7C4VVUY2ouv19NmTdR2KIaaSEv%2F1KNBWPSpnaMel2W6YC33Zow97qShOBOemdRLlthBic1716E1Kll6g%3D%3D%7Cbw0aW40SGz%2BzgmwZ%7C08%7C3; ds=96e525e9475b1c6b167ff8496144f220; _ga_E1H7XE0312=GS2.1.s1760397845$o5$g1$t1760397871$j34$l1$h1422833700; AMP_TOKEN=%24RETRIEVING; SPC_EC=.aWhyUnVlSmpjSGhjdXBOUH5TsyelqijLgrsw4ipFf48Sj+aU1u4nI8+dDc/qw00W307sj7E+v9NmvBEab/ZT5xoDtXoBOD9JTRcxwkiMHiwUIK7/MqcSOxqcosMMGAkRn7LFaZbL+wRd/fnie5bPV1AuG70N3lC2kOiOTGtbM17O3YPSx+v6YpfDDlwNgK2UmFDBxdcwRogBFsIfc1fZE2ScOatSkUHQRrvmGuv2oEy2TtrtfQZQPX/1aGRrtmWGN0bcizs5sVajQe/iFDTeCw==',
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