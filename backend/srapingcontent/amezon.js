const puppeteer = require('puppeteer');

const amezonProducts = async (search) => {
    try {
        const browser = await puppeteer.launch({
            headless: true, 
            slowMo: 20 
        });

        const page = await browser.newPage();
        await page.goto("https://www.amazon.in/");
        await page.waitForSelector('input[id="twotabsearchtextbox"]');
        await page.type('input[id="twotabsearchtextbox"]', `${search}`);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[data-csa-c-type="item"]');
        
        const products = await page.evaluate(() => {
            const elements = document.querySelectorAll('[data-csa-c-type="item"]');
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
                      '[class="a-size-medium a-color-base a-text-normal"]'
                    ).innerHTML;
                  } catch (error) {
                    console.log("No name");
                  }
                  try {
                    product.stars = element.querySelector(
                      '[class="a-icon-alt"]'
                    ).innerHTML;
                  } catch (error) {
                    console.log("No stars");
                  }
                  try {
                    product.price = element.querySelector(
                      '[class="a-offscreen"]'
                    ).innerHTML;
                  } catch (error) {
                    console.log("No price");
                  }
                  try {
                    el = element.querySelector(
                      '[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]'
                    );
                    product.url = "https://www.amazon.com" + el.getAttribute("href");
                  } catch (error) {
                    console.log('no url')
                  }
                  try {
                    el = element.querySelector('[class="s-image"]');
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
    }
  };
  // amezonProducts()
  module.exports=amezonProducts;
