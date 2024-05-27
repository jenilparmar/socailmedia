const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");

const {
  getImageL1,
  getImageL2,
  getImageL3,
  getImageL4,
} = require("./likeConfiguration");

const PORT = 5000;
const app = express();
url = "mongodb://127.0.0.1:27017/SocailMedia";
const dbName = "MemeMenia";
let db;
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);
  })
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());
//////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/users/:email", (req, res) => {
  const email = req.params.email
  const user = {
   
    email: email,
   
  };
  db.collection("Users")
    .findOne(user)
    .then((data) => {
      console.log(data);
      res.send(data)
      // res.sendStatus(404)
    })
    .catch((error) => console.log(error));
});
app.post("/Posts", (req, res) => {
  const user = {
    accountName: "Jenil_parmar",
    imgUrl: "hahahahaah",
    likes: 352,
    commets: {
      accountName1: "Hy this is my comments 1",
      accountName2: "Hy this is my comments 2",
    },
  };
  db.collection("Posts")
    .insertOne(user)
    .then((data) => {
      console.log(data);
      res.send("Haa post me save ho gaya ");
    })
    .catch((error) => console.log(error));
});

app.get("/PostData/:name", (req, res) => {
  const name = req.params.name;

  db.collection("Posts")
    .findOne({ accountName: name }) // Query for a document where the 'name' field matches the provided name
    .then((data) => {
      if (data) {
        res.json(data); // Send the found document as a JSON response
      } else {
        res.status(404).send("No document found with the given name"); // Handle case where no document is found
      }
    })
    .catch((e) => {
      console.error("Error fetching data", e);
      res.status(500).send("Error fetching data"); // Handle potential errors
    });
});
app.get("/GetAllPosts", (req, res) => {
  db.collection("Posts")
    .find({})
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
      res.status(500).send("Error fetching data");
    });
});
app.get("/search/:name", (req, res) => {
  const name = req.params.name;
  db.collection("Users")
    .findOne({ accountName: name })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});
app.get("/Auth/:email/:passward", (req, res) => {
  const email = req.params.email;
  const passward = req.params.passward;
  db.collection("Users")
    .findOne(
      {
        email: email,passward: passward
      } 
   
    )
    .then((data) => {
      if (data) res.send(data);
      else {
        res.sendStatus(404);
      }
    })
    .catch((e) => res.send(e));
});
app.get("/Dataentry/:email/:passward/:name",(req,res)=>{
  const email = req.params.email;
  const name= req.params.name;
  const passward  =req.params.passward;
  db.collection("Users")
  .insertOne({
    email:email,
    accountName:name,
    passward:passward
  }).then(data=>res.status(200).send(data))
  .catch(e=>res.send(e))

})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/GetLikeButtons", (req, res) => {
  const likesObj = {
    1: getImageL1(),
    2: getImageL2(),
    3: getImageL3(),
    4: getImageL4(),
  };

  res.send(likesObj);
});

app.get("/api", (req, res) => {
  res.json({
    message: {
      1: "Jenil",
      2: "Parmar",
      3: "Web-developer",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
