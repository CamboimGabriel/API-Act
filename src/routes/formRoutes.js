const express = require("express");
const mongoose = require("mongoose");
const Form = mongoose.model("Form");
const Family = mongoose.model("Family");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/novoFormulario", async (req, res) => {
  const { familyId, questionario } = req.body;

  const numeroDoFormulario = await Form.find({ familyId });

  await Family.findByIdAndUpdate(familyId, {
    $set: {
      formulariosPreenchidos: numeroDoFormulario.length + 1,
    },
  });

  try {
    const formulario = new Form({
      familyId: familyId,
      numeroDoFormulario: numeroDoFormulario.length + 1,
      questionario,
    });
    await formulario.save();

    res.send("Formulario cadastrado com sucesso");
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
