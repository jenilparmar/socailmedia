const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();
const {
  getImageL1,
  getImageL2,
  getImageL3,
  getImageL4,
} = require("./likeConfiguration");

const PORT = 5000;
const app = express();
app.use(cors())
url = process.env.connectionString;
const dbName = "MemeMenia";
let db;
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected successfully to MongoDB server");
    db = client.db(dbName);
  })
  .catch((error) => console.error("MongoDB connection error:", error));


app.use(express.json());
function getLikeInfo(acn, pera) {
  db.collection("Posts")
    .findOne({ accountName: acn })
    .then((data) => {
      return data["likes"][pera];
    })
    .catch((e) => {
      return e;
    });
}
// app.use(cors(
//   {
//     origin:['https://deploy-mern-1whq.vercel.app'],
//     methods:['POST','GET'],
//     credentials:true
//   }
// ))
//////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/users/:email", (req, res) => {
  const email = req.params.email;
  const user = {
    email: email,
  };
  db.collection("Users")
    .findOne(user)
    .then((data) => {
      console.log(data);
      res.send(data);
      // res.sendStatus(404)
    })
    .catch((error) => console.log(error));
});
app.post("/Posts", (req, res) => {
  const post = req.body;
  // console.log(post);
  db.collection("Posts")
    .insertOne(post)
    .then((data) => {
      let insertedId = data.insertedId; // Get the inserted ID
      // Update the FindUser collection with the post ID
      console.log(insertedId);
      db.collection("FindUser")
        .updateOne(
          { name: post.accountName }, // Assuming you're using accountName to identify the user
          { $push: { posts: insertedId } } // Add the post ID to the user's posts array
        )
        .then(() => {
          res.send("Post saved successfully and linked to the user.");
        })
        .catch((error) => {
          console.error("Error updating FindUser collection:", error);
          res.status(500).send("Error updating FindUser collection.");
        });
    })
    .catch((error) => {
      console.error("Error inserting post:", error);
      res.status(500).send("Error inserting post.");
    });
});
app.get("/PostData/:id", (req, res) => {
  const id = req.params.id;

  db.collection("Posts")
    .findOne({ _id: new ObjectId(id) }) // Query for a document where the 'name' field matches the provided name
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

app.get("/GetAllPosts/:name", async (req, res) => {
  const name = req.params.name;
  let visitedPosts = [];

  try {
    // Fetch the user data
    const user = await db.collection("FindUser").findOne({ name: name });
    if (user && Array.isArray(user.visitedPosts)) {
      // Convert visitedPosts to ObjectId if necessary
      visitedPosts = user.visitedPosts.map(id =>new ObjectId(id));
    }

    // Fetch all posts
    const allPosts = await db.collection("Posts").find({}).toArray();

    // Filter out visited posts
    const unvisitedPosts = allPosts.filter(post => !visitedPosts.some(visitedId => visitedId.equals(post['_id'])));

    // console.log(unvisitedPosts);
    res.send(unvisitedPosts);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).send("Error fetching data");
  }
});


app.get("/search/:name", (req, res) => {
  const name = req.params.name;
  db.collection("FindUser")
    .findOne({ name: name })
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
    .findOne({
      email: email,
      passward: passward,
    })
    .then((data) => {
      if (data) res.send(data);
      else {
        res.sendStatus(404);
      }
    })
    .catch((e) => res.send(e));
});
app.post("/Dataentry", (req, res) => {
  const data2 = req.body;
  console.log(data2.password);
  db.collection("Users")
    .insertOne({
      email: data2.email,
      accountName: data2.name,
      passward: data2.password,
    })
    .then((data) => {
      db.collection("FindUser").insertOne(data2);
      res.status(200).send(data);
    })
    .catch((e) => res.send(e));
});
app.get("/ForgotPass/:email", (req, res) => {
  const email = req.params.email;
  db.collection("Users")
    .findOne({ email: email })
    .then((data) => res.send(data["passward"]))
    .catch((e) => res.send(e));
});
app.get("/PostComment/:id/:text", (req, res) => {
  const id = req.params.id;
  const text = req.params.text;

  try {
    const objectId = new ObjectId(id);

    db.collection("Posts")
      .updateOne({ _id: objectId }, { $push: { comments: text } })
      .then((result) => {
        if (result.modifiedCount > 0) {
          res.send("Comment added successfully");
        } else {
          res.status(404).send("Post not found");
        }
      })
      .catch((e) => {
        console.error("Error updating post comments:", e);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.error("Invalid ID format:", error);
    res.status(400).send("Invalid ID format");
  }
});
app.get("/Addlike/:id/:pera", (req, res) => {
  const id = req.params.id;
  const pera = req.params.pera;

  db.collection("Posts")
    .updateOne(
      { _id: new ObjectId(id) }, // Filter by the post's ObjectId
      { $inc: { ["likes." + pera]: 1 } } // Increment the likes by 1 for the specified pera
    )
    .then((result) => {
      // Check if the update was successful
      if (result.modifiedCount > 0) {
        res.send("Like added successfully");
      } else {
        res.status(404).send("Post not found");
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error updating like:", error);
      res.status(500).send("Internal server error");
    });
});
app.get("/findUser/:name", (req, res) => {
  const name = req.params.name;
  db.collection("FindUser")
    .findOne({
      name: name,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.log(e);
    });
});
app.get("/getProfilePosts/:name", (req, res) => {
  const name = req.params.name;
  db.collection("Posts")
    .find({ accountName: name })
    .toArray() // Convert the cursor to an array
    .then((posts) => {
      if (posts.length > 0) {
        res.send(posts);
      } else {
        res.status(404).send("No posts found for the given accountName.");
      }
    })
    .catch((e) => {
      console.log("Error:", e);
      res.status(500).send("An error occurred while fetching profile posts.");
    });
});
app.get("/addFollowing/:otherAccount/:selfAccount", (req, res) => {
  const otherAccount = req.params.otherAccount;
  const selfAccount = req.params.selfAccount;
  db.collection("FindUser")
    .updateOne({ name: selfAccount }, { $push: { following: otherAccount } })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});
app.get("/addFollower/:otherAccount/:selfAccount", (req, res) => {
  const otherAccount = req.params.otherAccount;
  const selfAccount = req.params.selfAccount;
  db.collection("FindUser")
    .updateOne({ name: selfAccount }, { $push: { followers: otherAccount } })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});
app.get("/checkIsFollowing/:othername/:selfName", (req, res) => {
  const othername = req.params.othername;
  const selfName = req.params.selfName;
  db.collection("FindUser")
    .findOne({ name: selfName })
    .then((data) => {
      // console.log(data);
      if (data["following"].includes(othername)) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((e) => res.send(e));
});
app.get("/deletePost/:id", (req, res) => {
  const id = req.params.id;
  db.collection("Posts")
    .deleteOne({ _id: new ObjectId(id) })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.log(e);
    });
});
app.get("/deleteFromFindUser/:name/:index", (req, res) => {
  const name = req.params.name;
  const index = parseInt(req.params.index); // Parse index to integer

  db.collection("FindUser")
    .findOne({ name: name })
    .then((data) => {
      let arr = data["posts"]
        .slice(0, index)
        .concat(data["posts"].slice(index + 1));

      // Update the document with the modified array
      return db
        .collection("FindUser")
        .updateOne({ name: name }, { $set: { posts: arr } });
    })
    .then((result) => {
      res.send(result); // Send the update result to the client
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Error deleting element from array.");
    });
});
app.get("/setVisited/:id/:name", (req, res) => {
  const name = req.params.name;
  const id = req.params.id;
  db.collection("FindUser")
    .updateOne({ name: name }, { $addToSet: { visitedPosts: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

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
