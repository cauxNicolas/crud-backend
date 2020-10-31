const express = require("express");
const router = express.Router();
// mongoDB
const User = require("../models/User");
// hashage
const enBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

router.post("/", async (req, res) => {
  try {
    const email = req.fields.email;
    const password = req.fields.password;

    if (req.fields.email === "" || req.fields.password === "") {
      res.status(400).json("remplir les champs");
    } else if (
      !email.replace(/\s+/, "").length ||
      !password.replace(/\s+/, "").length
    ) {
      res.status(400).json("pas de champs vides");
    } else {
      const search = await User.findOne({ email: email });
      if (search) {
        const newHash = SHA256(password + search.salt).toString(enBase64);
        if (newHash === search.hash) {
          res.status(200).json("page login ok");
        } else {
          res.status(400).json("Email ou mot de passe erronés");
        }
      } else {
        res.status(400).json("Email ou mot de passe erronés");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
