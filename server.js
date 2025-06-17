const express = require("express");
const app = express();
const port = 3000;

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Pianist = require("./models/Pianist");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

await mongoose.connect(process.env.MONGODB_URI);

app.get("", (req, res) => {
  res.render("home");
});

app.get("/pianists", async (req, res) => {
  const allPianists = await Pianist.find({});
  res.render("pianists", { pianists: allPianists });
});

app.get("/pianists/new", (req, res) => {
  res.render("new");
});

app.get("/pianists/:_id", async (req, res) => {
  const pianistId = req.params._id;
  const singlePianist = await Pianist.findById(pianistId);
  res.render("individual", { pianist: singlePianist });
});

app.post("/pianists", async (req, res) => {
  const { name, country } = req.body;
  const newPianist = {
    name: name,
    country: country,
  };
  await Pianist.create(newPianist);
  res.redirect("/pianists");
});

app.delete("/pianists/:_id", async (req, res) => {
  let deletePianistId = req.params._id;
  await Pianist.findByIdAndDelete(deletePianistId);
  res.redirect("/pianists");
});

app.put("/pianists/:_id", async (req, res) => {
  const { name, country } = req.body;
  const editPianist = {
    name: name,
    country: country,
  };
  await Pianist.findByIdAndUpdate(req.params._id, editPianist, { new: true });
  res.redirect("/pianists/");
  // res.json(updatedPet); //? -> 200, 400, 404
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
