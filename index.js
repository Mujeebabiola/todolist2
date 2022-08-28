const express = require('express')
const app = express()
const mongoose = require('mongoose');


app.set('view engine','ejs'); //This how we start using ejs
app.use(express.urlencoded({extended: true})); //this line and the one below it replaces bosyparser
app.use(express.json());
app.use(express.static("public")) //Static files are saved in the public folder 

mongoose.connect('mongodb+srv://mujeeb:mujeeb@cluster0.txqqy5y.mongodb.net/todolistDB');
const itemSchema = {
  name:String
}

const item = mongoose.model('item', itemSchema);



app.get('/', function(req, res) { //xxx
 var today = new Date();

 option = {
     weekday :"long",
     day : "numeric",
     month : "long"
};
var day = today.toLocaleDateString("en-US",option)

item.find(function(err,result){
     res.render("list",{DisplayDay:day,NewItem:result}) //All important variables are shared from here to the ejs file.the "list"
     //is the EJS file name
     
})
 
 
})





app.post("/",function(req,res){
var Item = req.body.Input1 //This is where bodyParser is useful
if (Item)
//save to our database
{const kitty = new item({ name: Item });
kitty.save()}

  res.redirect("/") //THis will take it back to line xxx above
})


app.post('/delete',function(req,res){
  let checkbox = (req.body.checkbox) //the checkbox.id
  item.findByIdAndRemove(checkbox,function(err){
    if (err){
      console.log('THis is a problem')
    }

      console.log("checked item has been removed")
      res.redirect("/")
  })
})



app.listen(process.env.PORT || 3005, function() {
  console.log('Example app listening on port 3000')
})
