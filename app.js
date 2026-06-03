const express = require ('express');
const app = express();
app.set("view engine","ejs")
const path = require('path');
const usermodel= require('./models/user');
app.use(express.json());
app.use(express.urlencoded( {extended:true}));
app.use(express.static (path.join (__dirname,'public')));

app.get('/',function (req,res) {
    res.render('index');
});

app.get('/read',async function (req,res) {
  let users= await usermodel.find();
    res.render('read' ,{users});
});

app.get('/edit/:userid',async function (req,res) {
    let user= await usermodel.findOne({_id: req.params.userid});
      res.render("edit",{user});
  });

  app.post('/update/:userid',async function (req,res) {
   let {name,email,image}= req.body;
    let user= await usermodel.findOneAndUpdate({_id: req.params.userid},{name,email,image},{new:true});
      res.redirect('/read');
  });


  app.get('/delete/:id',async function (req,res) {
    let users= await usermodel.findOneAndDelete({_id: req.params.id});
    console.log(users);
      res.redirect('/read');
  });

app.post('/create', async (req,res) =>{
    let{name,email,image}= req.body;
   let createduser = await usermodel.create ({
        name,email,image});  
        res.send(createduser);
})
app.listen(3000);