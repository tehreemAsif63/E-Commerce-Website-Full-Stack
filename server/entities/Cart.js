const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  // Define the schema for individual cart items
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  quantity: {
    type: Number,
  
  },
});

const cartSchema = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    items: [cartItemSchema], // An array of cart items
  }
);

module.exports = mongoose.model("Cart", cartSchema);
