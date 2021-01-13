const express = require("express");
const mongoose = require("mongoose");
const Group = mongoose.model("Group");
const Family = mongoose.model("Family");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/novogrupo", async (req, res) => {
  try {
    const families = await Family.find({
      userId: req.user._id,
      pertenceGrupo: 0,
    });

    var j, x, i;
    for (i = families.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = families[i];
      families[i] = families[j];
      families[j] = x;
    }

    await Family.updateMany(
      { userId: req.user._id },
      {
        $set: {
          pertenceGrupo: 1,
        },
      }
    )
      .then((result) => {})
      .catch((error) => console.error(error));

    const families2 = families.splice(0, Math.ceil(families.length / 2));

    const group = new Group({
      controle: families,
      intervencao: families2,
      userId: req.user._id,
    });
    await group.save();

    res.send("Novo grupo cadastrado com sucesso");
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get("/grupos", async (req, res) => {
  const grupos = await Group.find({ userId: req.user._id });
  console.log(req.user._id--);
  res.send(grupos);
});

module.exports = router;
