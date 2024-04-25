const express = require('express');
const router = express.Router();
const scrapeAjioProducts=require('../srapingcontent/ajio');
const scrapecromaProducts=require('../srapingcontent/croma');
const amezonProducts=require('../srapingcontent/amezon');
const flipcartproducts=require('../srapingcontent/flipcart');
const myntraproducts=require('../srapingcontent/myntra');
const ytreviews=require('../srapingcontent/youtube');
const {ensureAuthenticated} =require('../authontication/auth')
const { User,Product }=require('../authontication/user');


router.get('/products', async (req, res) => {
    try {
        let productsWishlist = [];
        if (req.isAuthenticated()) {
            const user = await req.user;
            const productIds = user.wishlist.map(item => item._id);
            productsWishlist = await Product.find({ _id: { $in: productIds } });
        }
        
        res.render('productdisplay', {
            title: 'Products',
            ajioProducts: undefined,
            cromaProducts: undefined,
            amazonProducts: undefined,
            flipkartProducts: undefined,
            myntraProducts: undefined, 
            reviews: undefined,
            productsWishlist
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/home',async(req, res) => {
    let flag=true
    if(req.isAuthenticated()){
        flag=false
        res.render('home',{title: 'Home',flag});
    }
    else{
        res.render('home',{title: 'Home',flag});   
    }
    
});

router.get('/about',async(req, res) => {
    res.render('about',{title: 'about'});
});
router.get('/chat',async(req, res) => {
    res.render('chat',{title: 'chat'});
});
router.post('/products', async (req, res) => {
    try {
        let productIds = null;
        if (req.isAuthenticated()) {
            const user =await req.user;
            productIds = user.wishlist.map(item => item._id);
        }
        const [amazonProducts, flipkartProducts, cromaProducts, ajioProducts, myntraProducts,reviews,productsWishlist] = await Promise.all([
            amezonProducts(req.body.search) ,
            flipcartproducts(req.body.search),
            req.body.category === 'electronics' ? scrapecromaProducts(req.body.search) : undefined,
            req.body.category === 'fashion' ? scrapeAjioProducts(req.body.search) : undefined,
            req.body.category === 'fashion' ? myntraproducts(req.body.search) : undefined,
            ytreviews(req.body.search),
            Product.find({ _id: { $in: productIds } }),
        ]);

        // const reviews = await ytreviews(req.body.search);
        res.render('productdisplay', { 
            title: 'Products',
            ajioProducts,
            cromaProducts,
            amazonProducts,
            flipkartProducts,
            myntraProducts,
            reviews,
            productsWishlist
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/add-to-wishlist/:id', ensureAuthenticated, async (req, res) => {
    try{
        const user =await req.user;
        const productId = req.params.id;
        user.wishlist.pull({ _id: productId });
        await user.save();
        await Product.findByIdAndDelete(req.params.id);
    res.status(200).send('Product removed from wishlist successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.patch('/add-to-wishlist', ensureAuthenticated, async (req, res) => {
    try{
        const user =await req.user;
        const {name ,url,price}=req.body;
        console.log(req.body);
        const newProduct = new Product({
            name,
            url,
            price
        })
        await newProduct.save();
        console.log(newProduct._id);
        user.wishlist.push({ _id: newProduct._id });
        await user.save();
        res.status(200).json({ productId: newProduct._id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports=router;