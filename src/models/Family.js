const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  crianca: {
    nome: {
      type: String,
      required: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    idade: {
      type: Number,
      required: true,
    },
    nascimento: {
      type: String,
      required: true,
    },
    pele: {
      type: String,
      required: true,
    },
  },
  cuidador: {
    nome: {
      type: String,
      required: true,
    },
    idade: {
      type: Number,
      required: true,
    },
    nascimento: {
      type: String,
      required: true,
    },
    parentesco: {
      type: String,
      required: true,
    },
    escolaridade: {
      type: String,
      required: true,
    },
    anosEstudo: {
      type: Number,
      required: true,
    },
    localGrupo: {
      type: String,
      required: true,
    },
    endereco: {
      type: String,
      required: true,
    },
    cep: {
      type: Number,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    telefones: {
      type: String,
      required: true,
    },
    ocupacao: {
      type: String,
      required: true,
    },
    pele: {
      type: String,
      required: true,
    },
    religiao: {
      type: String,
      required: true,
    },
    situacaoConjugal: {
      type: String,
      required: true,
    },
    numeroFilhos: {
      type: String,
      required: true,
    },
    filhos0a6anos: {
      type: Number,
      required: true,
    },
    pessoasMorando: {
      type: Number,
      required: true,
    },
    recebeAuxilio: {
      type: String,
      required: true,
    },
    casoReceba: {
      type: String,
    },
    rendaMensal: {
      type: String,
      required: true,
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
