const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
  },
  numeroDoFormulario: {
    type: Number,
    default: 0,
  },
  questionario: [
    {
      pergunta: {
        type: String,
        default: "",
      },
      resposta: {
        type: String,
        default: "",
      },
    },
  ],
});

mongoose.model("Form", formSchema);
