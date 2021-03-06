const express = require("express");
const router = express.Router();
const User = require("../models/User");
// hashage password
const uid2 = require("uid2");
const enBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");
// mailgun
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MAILGUN_APIK_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

router.post("/signup", async (req, res) => {
  try {
    const name = req.fields.name;
    const lastname = req.fields.lastname;
    const email = req.fields.email;
    const textarea = req.fields.textarea;
    const password = req.fields.password;

    if (
      // constrole pour avoir des champs remplis
      name === "" ||
      lastname === "" ||
      email === "" ||
      textarea === "" ||
      password === ""
    ) {
      res.status(400).json("Merci de remplir les champs");
    } else if (
      // contrôle pour ne pas envoyer d'espaces vides en bdd
      !name.replace(/\s+/, "").length ||
      !lastname.replace(/\s+/, "").length ||
      !textarea.replace(/\s+/, "").length
    ) {
      res
        .status(400)
        .json("Merci de ne pas remplir les champs avec des espaces");
    } else {
      const search = await User.findOne({ email: req.fields.email });
      if (search) {
        res.status(400).json(" existe déjà !");
      } else {
        // hashage password
        const salt = uid2(16);
        const token = uid2(16);
        const hash = SHA256(password + salt).toString(enBase64);
        const newUser = new User({
          name,
          lastname,
          email,
          textarea,
          salt,
          token,
          hash,
        });
        await newUser.save();
        // mailgun
        const data = {
          from: "CRUD <exemple@gmail.com>",
          to: `${email}`,
          subject: "CRUD : Inscription réussie !",
          text: `Bonjour ${lastname}, \nveuillez trouver votre identifiant et votre mot de passe pour vous connecter à votre session : \n\nIdentifiant : ${email}\nMot de passe: ${password}\n\nToute l'équipe vous souhaite une excellente journée journée`,
        };
        await mg.messages().send(data, function (error, body) {
          console.log("body ->", body);
        });
        // on renvoit la réponse de mongoDB
        res.status(200).json({
          _id: newUser._id,
          name: newUser.name,
          lastname: newUser.lastname,
          email: newUser.email,
          textarea: newUser.textarea,
          info:
            "Inscription réussie ! Vous allez être redirigé vers la page login",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
