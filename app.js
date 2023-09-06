const express = require("express");
const path = require("path");
const app = express();
const fs=require('fs');
const mongoose = require("mongoose");
const { Script } = require("vm");
const bodyparser = require("body-parser", { UserNewUrlparser: true });
mongoose.connect("mongodb+srv://raviteja_2674:Raviteja_2674@raviteja.4iejfqt.mongodb.net/portfoliodetails?retryWrites=true&w=majority"); // FoodProject will be the database name // changed to ip adress from localhost because of updatee
const port = 40;


var condetails = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    subject: String,
    message: String
  });
  
  var pfcontactdetails = mongoose.model("pfContactdetails", condetails);  //contact details will be the collections name

  app.use('/views',express.static('views'))
  app.use('/images',express.static('images'))

  app.use(express.urlencoded({extended:true})); 

  app.get('/', (req, res)=>{

    res.sendFile(path.join(__dirname ,'/views','home.html'));
})

app.get('/aboutme', (req, res)=>{ 

    res.sendFile(path.join(__dirname ,'/views','aboutme.html'));
})

app.get('/projects', (req, res)=>{ 

    res.sendFile(path.join(__dirname ,'/views','projects.html'));
})
app.get('/contact', (req, res)=>{ 

    res.sendFile(path.join(__dirname ,'/views','contact.html'));
})

// function con(){
//     alert("Your form has been submitted succesfully..")
// }


// to  save details to database..
app.post('/contact', (req, res)=>{ 
    var myData = new pfcontactdetails (req.body);
    myData.save().then(()=>{
        // res.send("this Item has been saved to the Database")
        res.redirect('/contact')
    }).catch(()=>{
        res.status(400).send("Error Occured ")
    });
})


//To Start The Server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
