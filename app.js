const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost:27017/booking");

const app= express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const bookingSchema={
  Name: String,
  People: Number,
  Option: String,
  Date: Date,
  Time: String
};

const Booking= mongoose.model("Booking",bookingSchema);

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.get("/reservation",function(req,res){
  res.sendFile(__dirname+"/reservations.html");
});

app.get("/Success",function(req,res){
  res.sendFile(__dirname+"/success.html");
});

app.post("/reservation",function(req,res){

      let item= new Booking({
      Name: req.body.name,
      People: req.body.people,
      Option: req.body.type,
      Date: req.body.Date,
      Time: req.body.Time
    });
  item.save();
  res.redirect("/Success");
    
});

app.listen(3000,function(){
  console.log("Server Started in port 3000");
});
