const express = require("express");
const mongoose = require("mongoose");

 
const PORT = 5000;
const app = express();


///////////////////////Database Work//////////////////////////
mongoose.connect("mongodb://127.0.0.1:27017/SocailMedia")
const userSceama = new mongoose.Schema({
  accountName:String,
  date :Date,
  post : String
})
const userAccountModel = mongoose.model("Post" , userSceama)




//////////////////Crud////////////////////
 function AddToDataBase(collection){
 userAccountModel.insertMany(collection).then((res)=>{
  console.log(res);
 }).catch((err)=>{
  console.log(err);
 });
}


function FindOneFromDataBase(name) {
  userAccountModel.findOne({}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
}
function FindAllFromDataBase() {
  userAccountModel.find({}).then((data) => {
    
    // Send the response to the client
    return data;
    
  }).catch((err) => {
    console.log(err);
  });
}
 function DeleteFromDataBase(name) {
  userAccountModel.deleteOne(FindOneFromDataBase(name)).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  });
 }

////////////////////////////DataSending to Front End /////////////////
app.get("/PostData", (req, res) => {
  userAccountModel.find({}) // Retrieve all documents
    .then((data) => {
      console.log(data);
      res.send(data); // Send the data to the client
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
});



///////////////////////////////Routing Work/////////////////////
app.get("/api", (req, res) => {
  res.json({
    message: {
      1: "Jenil",
      2: "Parmar",
      3: "Web-developer"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
