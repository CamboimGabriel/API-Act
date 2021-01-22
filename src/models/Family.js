const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    filhos0a6anos: {
      type: Number,
      default: " ",
    },
    pessoasMorando: {
      type: Number,
      default: " ",
    },
    recebeAuxilio: {
      type: String,
      default: " ",
    },
    casoReceba: {
      type: String,
      default: "Não",
    },
    rendaMensal: {
      type: String,
      default: " ",
    },
  },
  pertenceGrupo: {
    type: Number,
    default: 0,
  },
  formulariosPreenchidos: {
    type: Number,
    default: 0,
  },
  passouControle: {
    type: Number,
    default: 0,
  },
  desabilitado: {
    type: Number,
    default: 0,
  },
  moraAtualmente: [
    {
      type: String,
      required: true,
    },
  ],
});

mongoose.model("Family", familySchema);
