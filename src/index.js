require("./models/User");
require("./models/Family");
require("./models/Group");
require("./models/Form");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const familyRoutes = require("./routes/familyRoutes");
const groupRoutes = require("./routes/groupRoutes");
const formRoutes = require("./routes/formRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(familyRoutes);
app.use(groupRoutes);
app.use(formRoutes);

const mongoUri =
  "mongodb+srv://act:Ceara@2020@clusteract.wbvvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo instance", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your user is ${req.user.nick}`);
});

app.listen(process.env.PORT || 5001, () => {
  console.log("Listening on port 5001");
});
