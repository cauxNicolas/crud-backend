require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const Signup = require("./routes/Signup");
app.use(Signup);

app.listen(3100, () => {
  console.log("server CRUD started");
});
