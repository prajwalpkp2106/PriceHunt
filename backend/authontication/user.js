const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:false
    },
    wishlist: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
    }],
});

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
});

const User=mongoose.model('users',UserSchema);
const Product=mongoose.model('product',productSchema);
module.exports={ User, Product };