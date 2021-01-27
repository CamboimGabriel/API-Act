const express = require("express");
const mongoose = require("mongoose");
const Family = mongoose.model("Family");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/novafamilia", async (req, res) => {
  const {
    criancaNome,
    criancaSexo,
    criancaIdade,
    criancaNascimento,
    cuidadorNome,
    moraAtualmente,
    cuidadorIdade,
    cuidadorNascimento,
    cuidadorAnosEstudo,
    cuidadorLocalGrupo,
    cuidadorEndereco,
    cuidadorCep,
    cuidadorCidade,
    cuidadorEstado,
    cuidadorTelefones,
    cuidadorNumeroFilhos,
    cuidadorFilho0a6Anos,
    cuidadorPessoasMorando,
    criancaPele,
    cuidadorParentesco,
    cuidadorEscolaridade,
    cuidadorOcupacao,
    cuidadorPele,
    cuidadorReligiao,
    cuidadorSituacaoConjugal,
    cuidadorRecebeAuxilio,
    cuidadorRendaMensal,
    cuidadorCasoReceba,
  } = req.body;

  try {
    const family = new Family({
      userId: req.user._id,
      crianca: {
        nome: criancaNome,
        sexo: criancaSexo,
        idade: criancaIdade,
        nascimento: criancaNascimento,
        pele: criancaPele,
      },
      cuidador: {
        nome: cuidadorNome,
        idade: cuidadorIdade,
        nascimento: cuidadorNascimento,
        parentesto: cuidadorParentesco,
        anosEstudo: cuidadorAnosEstudo,
        localGrupo: cuidadorLocalGrupo,
        endereco: cuidadorEndereco,
        cep: cuidadorCep,
        cidade: cuidadorCidade,
        estado: cuidadorEstado,
        telefones: cuidadorTelefones,
        numeroFilhos: cuidadorNumeroFilhos,
        filhos0a6Anos: cuidadorFilho0a6Anos,
        pessoasMorando: cuidadorPessoasMorando,
        escolaridade: cuidadorEscolaridade,
        ocupacao: cuidadorOcupacao,
        pele: cuidadorPele,
        religiao: cuidadorReligiao,
        situacaoConjugal: cuidadorSituacaoConjugal,
        recebeAuxilio: cuidadorRecebeAuxilio,
        casoReceba: cuidadorCasoReceba,
        rendaMensal: cuidadorRendaMensal,
      },
      moraAtualmente,
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

  res.send(familia);
});

router.get("/familia/form/:id", async (req, res) => {
  const id = req.params.id;

  const familia = await Family.findById(id);

  res.send(familia.formulariosPreenchidos);
});

router.post("/familia/disable/", async (req, res) => {
  const { id } = req.body;

  await Family.findByIdAndUpdate(id, {
    $set: {
      desabilitado: 1,
    },
  });

  res.send("ok");
});

module.exports = router;
