const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Image", ImageSchema);
