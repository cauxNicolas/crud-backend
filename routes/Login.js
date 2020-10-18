const express = require("express");
const router = express.Router();
// mongoDB
const User = require("../models/User");
// hashage
const enBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

router.post("/", async (req, res) => {
  try {
    console.log(req.fields);
    const email = req.fields.email;
    const password = req.fields.password;

    const search = await User.findOne({ email: email });
    console.log("search ->", search);
    if (search) {
      const newHash = SHA256(password + search.salt).toString(enBase64);
      if (newHash === search.hash) {
        res.status(200).json("page login ok");
      } else {
        res.status(400).json("l'email ou le mot de passe n'est pas correct");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
