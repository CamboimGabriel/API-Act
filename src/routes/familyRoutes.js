const express = require("express");
const mongoose = require("mongoose");
const Family = mongoose.model("Family");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/novafamilia", async (req, res) => {
  const { dataCriacao, crianca, cuidador, residentesCasa } = req.body;

  try {
    const family = new Family({
      userId: req.user._id,
      crianca,
      cuidador,
      dataCriacao,
      residentesCasa,
    });
    await family.save();

    res.send(family);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get("/familias", async (req, res) => {
  const familias = { semGrupo: [], comGrupo: [] };

  familias.semGrupo = await Family.find({
    userId: req.user._id,
    pertenceGrupo: 0,
  });

  familias.comGrupo = await Family.find({
    userId: req.user._id,
    pertenceGrupo: 1,
  });

  res.send(familias);
});

router.get("/familia/:id", async (req, res) => {
  const id = req.params.id;

  const familia = await Family.findById(id);

  console.log(familia);

  res.send(familia);
});

module.exports = router;
