const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  controle: [],
  intervencao: [],
  fase: {
    type: Number,
    default: 1,
  },
});

mongoose.model("Group", groupSchema);
