const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dataCriacao: {
    type: String,
    default: " ",
  },
  crianca: {
    nome: {
      type: String,
      default: " ",
    },
    sexo: {
      type: String,
      default: " ",
    },
    idade: {
      type: Number,
      default: " ",
    },
    nascimento: {
      type: String,
      default: " ",
    },
    pele: {
      type: String,
      default: " ",
    },
  },
  cuidador: {
    nome: {
      type: String,
      default: " ",
    },
    idade: {
      type: Number,
      default: " ",
    },
    nascimento: {
      type: String,
      default: " ",
    },
    parentesco: {
      type: String,
      default: " ",
    },
    escolaridade: {
      type: String,
      default: " ",
    },
    anosEstudo: {
      type: Number,
      default: " ",
    },
    localGrupo: {
      type: String,
      default: " ",
    },
    endereco: {
      type: String,
      default: " ",
    },
    cep: {
      type: Number,
      default: " ",
    },
    cidade: {
      type: String,
      default: " ",
    },
    estado: {
      type: String,
      default: " ",
    },
    telefones: {
      type: String,
      default: " ",
    },
    ocupacao: {
      type: String,
      default: " ",
    },
    pele: {
      type: String,
      default: " ",
    },
    religiao: {
      type: String,
      default: " ",
    },
    situacaoConjugal: {
      type: String,
      default: " ",
    },
    numeroFilhos: {
      type: String,
      default: " ",
    },
    idadeFilhos: {
      type: String,
      default: " ",
    },
    filhos0a6anos: {
      type: Number,
      default: " ",
    },
    moradia: {
      type: String,
      default: " ",
    },
    situacaoMoradia: {
      type: String,
      default: " ",
    },
    numeroComodos: {
      type: String,
      default: " ",
    },
    pessoasMorando: {
      type: String,
      default: " ",
    },
    recebeAuxilio: {
      type: String,
      default: " ",
    },
    rendaMensal: {
      type: String,
      default: " ",
    },
  },
  formulariosPreenchidos: {
    type: Number,
    default: 0,
  },
  pertenceGrupo: {
    type: Number,
    default: 0,
  },
});

mongoose.model("Family", familySchema);
