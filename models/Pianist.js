const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const pianistSchema = new Schema({
  name: String,
  country: String,
});

const Pianist = mongoose.model("pianists", pianistSchema);

module.exports = Pianist;
