require("./models/User");
require("./models/Family");
require("./models/Group");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const familyRoutes = require("./routes/familyRoutes");
const groupRoutes = require("./routes/groupRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(familyRoutes);
app.use(groupRoutes);

const mongoUri =
  "mongodb+srv://admin:Guitarra7762@cluster0.us2mg.mongodb.net/<dbname>?retryWrites=true&w=majority";
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

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
