const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  desc: {
    type: String, 
  },
  image: {
    type: String,
  }
});

module.exports = mongoose.model("Item", itemSchema);
