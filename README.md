# Shopee Scraper API

This repository contains a web scraper API for extracting product data from Shopee Taiwan's pages.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/TiwariAbhishek23/shopee-scraper-api.git
   ```

2. Install the dependencies:

   ```bash
   cd shopee-scraper-api
   pnpm install
   ```

3. Start the server:

   ```bash
   pnpm run dev
   ```

4. Open your browser and navigate to <http://localhost:3000>

## Env Setup

Create a `.env` file in the root directory of the project and add the following:

```env
PORT
PROXY_HOST
PROXY_PORT
PROXY_USERNAME
PROXY_PASSWORD
```


## API Endpoints

- `/shopee`

  - **Method**: `GET`
  - **Query Parameters**:
    - `itemId`: The ID of the product.
    - `shoreId`: The ID of the shop.
  - **Response**: A JSON format with all details.

## Some Resources

- <https://www.linkedin.com/posts/waffensultan_%3F%3F%3F%3F-%3F%3F%3F%3F%3F%3F%3F-%3F%3F-%3F-%3F%3F%3F-activity-7266047405639249920-M4Fw/>

- <https://stackoverflow.com/questions/73424180/scrape-shopee-api-v4/>

- <https://github.com/akherlan/onlineshop>

- <https://github.com/fazxid/shopee-product-scraper>


## License

This project is licensed under the MIT License

## Issues

If you encounter any issues, feel free to create an issue in the repository.

