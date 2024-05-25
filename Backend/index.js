const express = require("express");
const mongoose = require("mongoose");
const {
  getImageL1,
  getImageL2,
  getImageL3,
  getImageL4,
} = require("./likeConfiguration");

const PORT = 5000;
const app = express();

///////////////////////Database Work//////////////////////////
// --------------- Scroll page scema ---------------
mongoose.connect("mongodb://127.0.0.1:27017/SocailMedia");
const userSceama = new mongoose.Schema({
  accountName: String,
  date: Date,
  post: String,
  comment: {
    type: Map,
    of: new mongoose.Schema({
      followerAccountName: String,
      commentText: String,
    }),
  },
});

const userAccountModel = mongoose.model("Post", userSceama);
// -----------Chat apge user scema -------------
const userChatSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  receivers: {
    type: Map,
    of: new mongoose.Schema({
      // Assuming receivers is a map of user IDs to some metadata
      // Define the structure of the metadata here
      read: { type: Boolean, default: false },
      message: { type: String, required: true },
      // Add more fields as necessary
    }),
    required: true,
  },
});

const UserChat = mongoose.model("UserChat", userChatSchema);

//////////////////Crud////////////////////
function AddToDataBase(collection) {
  userAccountModel
    .insertMany(collection)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// AddToDataBase(sampleData)
function FindOneFromDataBase(name) {
  userAccountModel
    .findOne({})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
function FindAllFromDataBase() {
  userAccountModel
    .find({})
    .then((data) => {
      // Send the response to the client
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}
function DeleteFromDataBase(name) {
  userAccountModel
    .deleteOne(FindOneFromDataBase(name))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function AddToUserChatDatabase(object) {
  UserChat.insertMany(object);
}

////////////////////////////DataSending to Front End /////////////////
app.get("/PostData", (req, res) => {
  userAccountModel
    .find({}) // Retrieve all documents
    .then((data) => {
      // console.log(data);
      res.send(data); // Send the data to the client
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
});
app.get("/GetChats/:name", (req, res) => {
  const name = req.params.name;

  UserChat.find({ accountName: name })
    .then((data) => {
      if (data.length > 0) {
        // If there are matching documents, send them as an array
        res.send(data);
      } else {
        // If no matching documents are found, send a message
        res.status(404).send("Nothing to show. Start a new chat.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving data from the database");
    });
});
app.get("/GetComments/:name", (req, res) => {
  const name = req.params.name;
  userAccountModel.findOne({accountName:name}).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err);
  })
});




////////////////////////Like Buttons//////////////////////////

app.get("/GetLikeButtons", (req, res) => {
  const likesObj = {
    1: getImageL1(),
    2: getImageL2(),
    3: getImageL3(),
    4: getImageL4(),
  };

  res.send(likesObj);
});

///////////////////////////////Routing Work/////////////////////
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
