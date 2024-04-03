const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true, 
            slowMo: 20 
        });

        const page = await browser.newPage();
        await page.goto("https://www.croma.com/");
        await page.waitForSelector('input[id="searchV2"]');
        await page.type('input[id="searchV2"]', 'iphone');
        await page.keyboard.press('Enter');
        await page.waitForSelector('[class="product-item"]');
        
        const products = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class="product-item"]');
            const products = [];
            
            
            elements.forEach(element => {
                
                const product = {
                    
                    name: "",
                    stars: 0,
                    price: 0,
                    url: "",
                    img: "",
                  };
                  try {
                    product.name = element.querySelector(
                      '[class="product-title plp-prod-title"]'
                    ).textContent;
                  } catch (error) {
                    console.log("No name");
                  }
                  try {
                    product.stars = element.querySelector(
                      '[class="rating-text"]'
                    ).textContent;
                  } catch (error) {
                    console.log("No stars");
                  }
                  try {
                    product.price = element.querySelector(
                      '[class="amount plp-srp-new-amount"]'
                    ).innerHTML;
                  } catch (error) {
                    console.log("No price");
                  }
                  try {
                    el = element.querySelector(
                      '[class="product-title plp-prod-title"]'
                    );
                    product.url = "https://www.croma.com" + (el.querySelector('a')).getAttribute("href");
                  } catch (error) {
                    console.log('no url')
                  }
                  try {
                    el = element.querySelector('[class="product-img plp-card-thumbnail plpnewsearch"]');
                    product.img = (el.querySelector('img')).getAttribute("src");
                  } catch (error) {
                    console.log('No image')
                  }
                  products.push(product);
                });
                return products;
            });
        console.log(products);

        await browser.close();
        return products;
    } catch (error) {
        console.error(error);
    }
})();
