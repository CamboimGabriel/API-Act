const { response } = require("express");
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

    await Family.updateMany(
      { _id: { $in: families } },
      {
        $set: {
          passouControle: 1,
        },
      }
    );

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
  const grupos = { ativos: [], encerrados: [] };

  grupos.ativos = await Group.find({
    userId: req.user._id,
    $or: [{ fase: 1 }, { fase: 2 }],
  }).populate(["intervencao", "controle"]);

  grupos.encerrados = await Group.find({
    userId: req.user._id,
    fase: 3,
  }).populate(["intervencao", "controle"]);

  res.send(grupos);
});

router.get("/grupo/fase/:id", async (req, res) => {
  const id = req.params.id;

  const grupo = await Group.findById(id);

  if (grupo.fase === 1) {
    await Group.findByIdAndUpdate(id, {
      $set: {
        fase: 2,
        controle: grupo.intervencao,
        intervencao: grupo.controle,
      },
    });
  } else if (grupo.fase === 2) {
    await Group.findByIdAndUpdate(id, {
      $set: {
        fase: 3,
        controle: [],
        intervencao: grupo.controle.concat(grupo.intervencao),
      },
    });
  }

  const newGroup = await Group.findById(id);

  if (newGroup.fase < 3) {
    const group = { ativos: [newGroup] };
    console.log(group);
    res.send(group);
  } else {
    const group = {
      encerrados: [newGroup],
    };
    console.log(group);
    res.send(group);
  }
});

module.exports = router;
