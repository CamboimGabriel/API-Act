const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  controle: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
    },
  ],
  intervencao: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
    },
  ],
  dataCriacao: {
    type: String,
    default: "",
  },
});

mongoose.model("Group", groupSchema);
