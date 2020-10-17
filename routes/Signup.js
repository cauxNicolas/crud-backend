const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const name = req.fields.name;
    const lastname = req.fields.lastname;
    const email = req.fields.email;
    const textarea = req.fields.textarea;

    if (
      // contrôle pour ne pas envoyer d'espaces vides en bdd
      !name.replace(/\s+/, "").length ||
      !lastname.replace(/\s+/, "").length ||
      !textarea.replace(/\s+/, "").length
    ) {
      res
        .status(400)
        .json("Merci de ne pas remplir les champs avec des espaces");
    } else {
      const newUser = new User({
        name,
        lastname,
        email,
        textarea,
      });
      await newUser.save();
      res.status(200).json({ name, lastname, email, textarea });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
