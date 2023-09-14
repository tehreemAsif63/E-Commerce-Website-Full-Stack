const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
   
  },
  type: [{
    type: String,

  }]
});

module.exports = mongoose.model("Item", itemSchema);
