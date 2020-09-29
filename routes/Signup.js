const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  try {
    console.log(req.fields);
    res.status(200).json("route signup ok");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
