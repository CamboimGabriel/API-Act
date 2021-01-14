const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  controle: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
      },
      formulariosPreenchidos: {
        type: Number,
        default: 0,
      },
    },
  ],
  intervencao: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
      },
      formulariosPreenchidos: {
        type: Number,
        default: 0,
      },
    },
  ],
});

mongoose.model("Group", groupSchema);
