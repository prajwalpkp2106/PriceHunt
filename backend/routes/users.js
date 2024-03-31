const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User=require('../authontication/user');
const passport=require('passport');

router.get('/login', (req, res) => {
    res.render('loginpage', { title: 'Login' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'register' });
});

router.post('/register', (req, res) => {
    // console.log(req.body);
    const {name ,email,password,password2}=req.body;
    let errors=[];
    if(!name || !email || !password ||!password2){
        errors.push({msg:'Please fill all the filds'});
    }
    if(password !== password2){
        errors.push({msg:'Password do not match'});
    }
    if(password.length<6){
        errors.push({msg:'Password should be at list 6 characters'});
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2,
            title:'register'
        });
        console.log('Hiiiii');
    }
    else{
        // res.send('pass');
        User.findOne({ email: email }).then(user => {
            if (user) {
              errors.push({ msg: 'Email already exists' });
              res.render('register', {
                errors,
                name,
                email,
                password,
                password2,
                title:"register"
              });
            } else {
              const newUser = new User({
                name,
                email,
                password
              });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => {
                    //   req.flash(
                    //     'success_msg',
                    //     'You are now registered and can log in'
                    //   );
                      res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                });
              });
            }
        });
    }
});




router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/home',
    failureRedirect:'/users/login',
    failureFlash:true
  })(req,res,next);
});

module.exports = router;
