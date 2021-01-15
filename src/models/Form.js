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
  questionario: { type: Object },
});

mongoose.model("Form", formSchema);
