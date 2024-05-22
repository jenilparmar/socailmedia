const express = require("express");

const PORT = 5000;

const app = express();

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
