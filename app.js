// main package importing
const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const cors = require("cors");
// Middleware importing
const checkTeamNameLabel = require("./middleware/checkTeamNameLabel");
const removeLabel = require("./middleware/removeLabel"); // remove Label middleware --> Not Use
// variables importing
let count = 0;
// mian package configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app configuration
app.post("/",[checkTeamNameLabel], (req, res, next) => {
  if (req.body) {
    count++;
    console.log(`New Req --> Count: ${count}`);
  }
  res.status(204).end();
});

app.listen(3001, () => {
  console.log("Server --> Run \nCount Req --> 0");
});
