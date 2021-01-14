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
    },
  ],
  intervencao: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
      },
    },
  ],
});

mongoose.model("Group", groupSchema);
