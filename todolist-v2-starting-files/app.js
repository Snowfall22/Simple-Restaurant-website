//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});

const itemsSchema = {
  name: String
};

const Item= mongoose.model("Item",itemsSchema);

const item1= new Item({
  name:"Welcome to your checklist!"
});

const item2= new Item({
  name:"click + to add new item"
});

const item3= new Item({
  name:"<-- to delete item"
});

const defaultItems= [item1,item2,item3];

const listSchema={
  name: String,
  items: [itemsSchema]
};

const List= mongoose.model("List",listSchema);

app.get("/", function(req, res) {
    Item.find({},function(err,foundItems){
      if(foundItems.length===0){
        Item.insertMany(defaultItems,function(err){
          if(err)
            console.log(err);
          else
            { console.log("Updated!");
              res.redirect("/");
            }
        });
      }else{
          res.render("list", {listTitle: "Today", newListItems: foundItems});
      }

  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item= new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");
});

app.post("/delete",function(req, res){
  const checkedId= req.body.checkbox;
  Item.findByIdAndRemove(checkedId,function(err){
    if(!err)
      console.log("deleted!");
      res.redirect("/");
  });
});

app.get("/:customListName",function(req,res){
  const customListName= (req.params.customListName);

  if()

  const list= new List({
      name: customListName,
      items: defaultItems});

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
