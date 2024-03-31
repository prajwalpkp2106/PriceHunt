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
    instaid:{
        type:String,
        required:false
    },
    instapass:{
        type:String,
        required:false
    },
    fbid:{
        type:String,
        required:false
    },
    fbpass:{
        type:String,
        required:false
    },
    twiid:{
        type:String,
        required:false
    },
    twipass:{
        type:String,
        required:false
    }
});

const User=mongoose.model('users',UserSchema);
module.exports=User;