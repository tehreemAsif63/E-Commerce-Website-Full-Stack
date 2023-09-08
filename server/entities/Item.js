const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // You can store the image URL or file path as a string
    },
    type: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("Item", itemSchema);
