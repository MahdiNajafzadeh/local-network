const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const checkName = require("./middlewares/checkName");
const emptyMW = require("./middlewares/emptyMW");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/",[checkName,emptyMW], (req, res) => {
  console.log(req.body);
  console.log("============================================================================================================")
  //console.log(req.body.user.name);
  res.status(204).end();
});

app.listen(5000, () => {
  console.log("Server --> Run");
});
