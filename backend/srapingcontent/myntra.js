const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true, 
            slowMo: 20 
        });

        const page = await browser.newPage();
        await page.goto("https://www.myntra.com/");
        await page.waitForSelector('input[class="desktop-searchBar"]');
        await page.type('input[class="desktop-searchBar"]', 'kurti');
        await page.keyboard.press('Enter');
        await page.waitForSelector('[class="product-base"]');
        
        const products = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class="product-base"]');
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
                      '[class="product-product"]'
                    ).textContent;
                  } catch (error) {
                    console.log("No name");
                  }
                  try {
                    el= element.querySelector(
                      '[class="product-ratingsContainer"]'
                    );
                    product.stars =(el.querySelector('span')).textContent;
                  } catch (error) {
                    console.log("No stars");
                  }
                  try {
                    product.price = element.querySelector(
                      '[class="product-discountedPrice"]'
                    ).textContent;
                  } catch (error) {
                    console.log("No price");
                  }
                  try {
                    el = (element.querySelector('a'));
                    product.url = "https://www.myntra.com/" + el.getAttribute("href");
                  } catch (error) {
                    console.log('no url')
                  }
                  try {
                    el = element.querySelector('[class="img-responsive"]');
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
