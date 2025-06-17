const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Pianist = require("./models/Pianist");

app.get("", (req, res) => {
  res.send("<p>Hello World!</p>");
});

app.get("/pianists", async (req, res) => {
  await mongoose.connect(process.env.MONGODB_URI);
  const allPianists = await Pianist.find({});
  res.render("pianists", { pianists: allPianists });
});

app.get("/pianists/new", (req, res) => {
  res.render("new");
});

const createNew = async () => {
  app.post("/pianists", async (req, res) => {
    await mongoose.connect(process.env.MONGODB_URI);
    const { name, country } = req.body;
    const newPianist = {
      name: name,
      country: country,
    };
    await Pianist.create(newPianist);
    res.redirect("/pianists");
  });
};
createNew();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export { createNew };
