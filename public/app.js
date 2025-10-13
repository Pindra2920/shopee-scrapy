// Global variables
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let currentCollectionId = '8835424'; // Default collection
const productsPerPage = 20;

// DOM elements
const productsGrid = document.getElementById('products-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const emptyState = document.getElementById('empty-state');
const pagination = document.getElementById('pagination');
const totalProductsSpan = document.getElementById('total-products');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumbers = document.getElementById('page-numbers');
const collectionButtons = document.querySelectorAll('.collection-btn');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Collection button listeners
    collectionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const collectionId = e.target.getAttribute('data-collection');
            selectCollection(collectionId);
        });
    });
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    sortSelect.addEventListener('change', handleSort);
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            updatePagination();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            updatePagination();
        }
    });
}

// Select collection and load products
function selectCollection(collectionId) {
    // Update active button
    collectionButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-collection') === collectionId) {
            btn.classList.add('active');
        }
    });
    
    // Update current collection and load products
    currentCollectionId = collectionId;
    loadProducts();
}

// Load products from API
async function loadProducts() {
    try {
        showLoading();
        hideError();
        
        const response = await fetch(`/shopee?collection_id=${currentCollectionId}`);
        const data = await response.json();
        
        if (data.success && data.products) {
            allProducts = data.products;
            filteredProducts = [...allProducts];
            totalProductsSpan.textContent = `${allProducts.length} products found`;
            hideLoading();
            renderProducts();
            updatePagination();
        } else {
            throw new Error(data.error || 'Failed to load products');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        hideLoading();
        showError();
    }
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.seller_name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderProducts();
    updatePagination();
    updateTotalCount();
}

// Handle sorting
function handleSort() {
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.ratings - a.ratings);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filteredProducts = [...allProducts];
    }
    
    currentPage = 1;
    renderProducts();
    updatePagination();
}

// Render products on current page
function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        showEmptyState();
        return;
    }
    
    hideEmptyState();
    
    productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    const imageUrl = product.images.length > 0 
        ? `https://down-tw.img.susercontent.com/file/${product.images[0]}`
        : 'https://via.placeholder.com/300x200?text=No+Image';
    
    const currentPrice = formatPrice(product.price);
    const originalPrice = product.original_price > product.price ? formatPrice(product.original_price) : '';
    const discount = product.promotion_info?.discount || 0;
    const discountBadge = discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : '';
    
    const promotionLabels = product.promotion_info?.promotion_labels?.map(label => 
        `<div class="promotion-label">${label.text}</div>`
    ).join('') || '';
    
    const stars = generateStars(product.ratings);
    const stockClass = product.item_status === 'sold_out' ? 'stock-sold-out' : 'stock-available';
    const stockText = product.item_status === 'sold_out' ? 'Sold Out' : 'In Stock';
    
    return `
        <div class="product-card" onclick="openProduct(${product.item_id})">
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.name}" loading="lazy" />
                ${discountBadge}
                ${promotionLabels ? `<div class="promotion-labels">${promotionLabels}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="price-container">
                    <span class="current-price">${currentPrice}</span>
                    ${originalPrice ? `<span class="original-price">${originalPrice}</span>` : ''}
                </div>
                <div class="rating-container">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">(${product.review_count})</span>
                </div>
                <div class="shop-info">
                    <div class="shop-name">${product.seller_name}</div>
                    <div class="shop-location">${product.shop_location}</div>
                </div>
                <div class="stock-status ${stockClass}">${stockText}</div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<span class="star">☆</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<span class="star" style="color: #ddd;">★</span>';
    }
    
    return stars;
}

// Format price (divide by 100000 for TWD)
function formatPrice(price) {
    const formattedPrice = (price / 100000).toFixed(0);
    return `NT$ ${formattedPrice}`;
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.classList.add('hidden');
        return;
    }
    
    pagination.classList.remove('hidden');
    
    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Generate page numbers
    let pageNumbersHTML = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === currentPage ? 'active' : '';
        pageNumbersHTML += `<button class="page-number ${isActive}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    pageNumbers.innerHTML = pageNumbersHTML;
}

// Go to specific page
function goToPage(page) {
    currentPage = page;
    renderProducts();
    updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open product (placeholder function)
function openProduct(itemId) {
    // You can implement this to open product details or external link
    console.log('Opening product:', itemId);
    // Example: window.open(`https://shopee.tw/product/${itemId}`, '_blank');
}

// Update total count display
function updateTotalCount() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        totalProductsSpan.textContent = `${allProducts.length} products found`;
    } else {
        totalProductsSpan.textContent = `${filteredProducts.length} of ${allProducts.length} products found`;
    }
}

// Show/hide loading states
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    pagination.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
    productsGrid.classList.remove('hidden');
}

function showError() {
    errorMessage.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    pagination.classList.add('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showEmptyState() {
    emptyState.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    pagination.classList.add('hidden');
}

function hideEmptyState() {
    emptyState.classList.add('hidden');
}
