const express = require('express');
const { collection } = require('../models/homeSchema');
const Router = express.Router();
const homeSchema = require('../models/homeSchema')

Router.get('/', (err, res) => {
    res.render('register', { title: 'Fill Form', password: '', email: '' });
})
Router.post('/register', async(req, res) => {
    try {
        const {
            name,
            number,
            email,
            password,
            cpassword
        } = req.body;
        if (password == cpassword) {
            var data={
                'name':req.body.name,
                'number':req.body.number,
                'email':req.body.email,
                'password':req.body.password
            }
            await data.save();
            const useremail = await homeSchema.findOne({ email: email })
            if (email === useremail.email) {
                res.render('register', { title: '', password: '', email: 'Email already exists' });

            }
            else {
                console.log(email)
            }

        }
        else {
            res.render('register', { title: '', password: 'PassWord Not Matching', email: '' });

        }
    } catch (error) {

        res.render('register', { title: 'Error in Code', password: '', email: '' });

    }

})

// login part
Router.post('/login',(req,res)=>{
    const{
        email,
        password
    }=req.body;

    homeSchema.findOne({email:email},(err,result)=>{
        if(email===result.email && password===result.password){
            res.render('dashboard',{name:result.name})
        }
        else{
            console.log(err)
        }
    })


})



module.exports = Router;