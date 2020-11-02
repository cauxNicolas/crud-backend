require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

// connexion bdd
mongoose.connect(process.env.MONGOOSE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(formidable());
app.use(cors());

const Signup = require("./routes/Signup");
app.use(Signup);
const Login = require("./routes/Login");
app.use(Login);
const Home = require("./routes/Home");
app.use(Home);

// catch error
app.all("*", (req, res) => {
  try {
    res.status(200).json("app.all : Route inconnue");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT || 3100, () => {
  console.log("server CRUD started");
});
