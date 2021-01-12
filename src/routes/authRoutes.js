const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { nick, password } = req.body;

  try {
    const user = new User({ nick, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { nick, password } = req.body;

  if (!nick || !password) {
    return res.status(422).send({ error: "Must provide nick and password" });
  }

  const user = await User.findOne({ nick });

  if (!user) {
    return res.status(404).send({ error: "Invalid password or nick." });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or nick." });
  }
});

module.exports = router;
