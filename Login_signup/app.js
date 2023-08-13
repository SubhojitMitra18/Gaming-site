const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const homeRouter=require('./routers/homeRouter');

const port=process.env.port || 8080;

const app=express();
// db connection
mongoose.connect('mongodb://127.0.0.1:27017/Developers',{useNewUrlParser:true})
const db=mongoose.connection;
db.on("error",()=>{
    console.log("Error in Connection");
})
db.once('open',()=>{console.log("Connected");})




app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/',homeRouter);


app.listen(8080);