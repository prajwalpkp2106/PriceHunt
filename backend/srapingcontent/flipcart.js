const puppeteer = require('puppeteer');

const flipcartproducts = async (search) => {
    try {
        const browser = await puppeteer.launch({
            headless: true, 
            slowMo: 20 
        });

        const page = await browser.newPage();
        await page.goto("https://www.flipkart.com/");
        await page.waitForSelector('input[type="text"]');
        await page.type('input[type="text"]', `${search}`);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[class="_2kHMtA"]');
        
        const products = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class="_2kHMtA"]');
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
                      '[class="_4rR01T"]'
                    ).innerHTML;
                  } catch (error) {
                    console.log("No name");
                  }
                  try {
                    product.stars = element.querySelector(
                      '[class="_3LWZlK"]'
                    ).textContent;
                  } catch (error) {
                    console.log("No stars");
                  }
                  try {
                    product.price = element.querySelector(
                      '[class="_30jeq3 _1_WHN1"]'
                    ).innerHTML;
                  } catch (error) {
                    console.log("No price");
                  }
                  try {
                    el = element.querySelector(
                      '[class="_1fQZEK"]'
                    );
                    product.url = "https://www.flipkart.com" + el.getAttribute("href");
                  } catch (error) {
                    console.log('no url')
                  }
                  try {
                    el = element.querySelector('[class="_396cs4"]');
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

  module.exports=flipcartproducts;