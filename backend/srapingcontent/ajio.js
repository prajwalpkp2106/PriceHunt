const puppeteer = require('puppeteer');

const scrapeAjioProducts = async (search) => {
    try {
        const browser = await puppeteer.launch({
            headless: true, 
            slowMo: 20 
        });

        const page = await browser.newPage();
        await page.goto("https://www.ajio.com/");
        await page.waitForSelector('input[aria-label="Search Ajio"]');
        await page.type('input[aria-label="Search Ajio"]', `${search}`);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[class="item rilrtl-products-list__item item"]');
        
        const products = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class="item rilrtl-products-list__item item"]');
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
                      '[class="nameCls"]'
                    ).textContent;
                  } catch (error) {
                    console.log("No name");
                  }
                  try {
                    product.stars = element.querySelector(
                      '[class="_1N0OO"]'
                    ).textContent;
                  } catch (error) {
                    console.log("No stars");
                  }
                  try {
                    product.price = element.querySelector(
                      '[class="price  "]'
                    ).textContent;
                  } catch (error) {
                    console.log("No price");
                  }
                  try {
                    el = element.querySelector(
                      '[class="rilrtl-products-list__link desktop"]'
                    );
                    product.url = "https://www.ajio.com" + el.getAttribute("href");
                  } catch (error) {
                    console.log('no url')
                  }
                  try {
                    el = element.querySelector('[class="rilrtl-lazy-img  rilrtl-lazy-img-loaded"]');
                    product.img = el.getAttribute("src");
                  } catch (error) {
                    console.log('No image')
                  }
                  if(product.img!=""){
                    products.push(product);
                  }
                 
                });
                return products;
            });
        console.log(products);

        await browser.close();
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
  };

  module.exports=scrapeAjioProducts;
