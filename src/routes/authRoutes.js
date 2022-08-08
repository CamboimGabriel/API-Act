const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { nick, password, cidade, coord } = req.body;

  try {
    if (coord) {
      const user = new User({ nick, password, cidade, coord });
      await user.save();
    } else {
      const user = new User({ nick, password, cidade });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/changepassword", async (req, res) => {
  const { nick, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  await User.findOneAndUpdate({ nick }, { password: hash });

  res.send("success");
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
    res.send({ token, coord: user.coord });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or nick." });
  }
});

router.get("/users", async (req, res) => {
  const user = await User.find({});

  res.send(user);
});

module.exports = router;
