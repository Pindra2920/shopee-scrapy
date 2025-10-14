const axios = require('axios');

async function testAPI() {
    try {
        const response = await axios.get('http://localhost:3000/shopee?collection_id=5086396');
        
        console.log('API Response structure:');
        console.log('Success:', response.data.success);
        console.log('Total products:', response.data.total_products);
        console.log('Products array length:', response.data.products ? response.data.products.length : 'undefined');
        console.log('Error:', response.data.error);
        console.log('Details:', response.data.details);
        
        if (response.data.products && response.data.products.length > 0) {
            const firstProduct = response.data.products[0];
            
            console.log('\nFirst product details:');
            console.log('Item ID:', firstProduct.item_id);
            console.log('Name:', firstProduct.name);
            console.log('Description:', firstProduct.description);
            console.log('Brand:', firstProduct.brand);
            console.log('Description length:', firstProduct.description ? firstProduct.description.length : 0);
            console.log('Brand length:', firstProduct.brand ? firstProduct.brand.length : 0);
            
            // Check if any products have non-empty description or brand
            const productsWithDescription = response.data.products.filter(p => p.description && p.description.trim() !== '');
            const productsWithBrand = response.data.products.filter(p => p.brand && p.brand.trim() !== '');
            
            console.log(`\nProducts with description: ${productsWithDescription.length}/${response.data.products.length}`);
            console.log(`Products with brand: ${productsWithBrand.length}/${response.data.products.length}`);
        } else {
            console.log('No products found in response');
        }
        
    } catch (error) {
        console.error('Error testing API:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testAPI();
