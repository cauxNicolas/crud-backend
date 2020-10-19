const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  try {
    res.status(200).json("page home");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
