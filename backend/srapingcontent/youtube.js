const puppeteer = require('puppeteer');

const ytreviews = async (search) => {
    try {
        const browser = await puppeteer.launch({
            headless: true, 
            slowMo: 20 
        });

        const page = await browser.newPage();
        await page.goto("https://www.youtube.com/");
        await page.waitForSelector('input[id="search"]');
        await page.type('input[id="search"]', `${search} review`);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[class="style-scope ytd-item-section-renderer"]');
        
        const products = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class="style-scope ytd-item-section-renderer"]');
            const products = [];
            
            
            elements.forEach(element => {
                
                const product = {
                    
                    name: "",
                    url: "",
                    img: "",
                  };
                  try {
                     product.name= element.querySelector(
                      '[id="video-title"]'
                    ).textContent.trim();
                    
                  } catch (error) {
                    console.log("No name");
                  }
                  try {
                    el = element.querySelector('[id="thumbnail"]');
                    product.url = "https://www.youtube.com" + el.getAttribute("href");
                  } catch (error) {
                    console.log('no url')
                  }
                  try {
                    // el = element.querySelector('[class="img-responsive"]');
                    (async()=>{await page.waitForTimeout(3000);})();
                    product.img = (element.querySelector('img')).getAttribute("src");
                  } catch (error) {
                    console.log('No image')
                  }
                  if(product.name!="" && product.img!=""){
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

  module.exports=ytreviews