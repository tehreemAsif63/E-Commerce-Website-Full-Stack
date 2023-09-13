const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  //for items of a cart
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  quantity: {
    type: Number,
    required: true,
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
    items: [cartItemSchema], 
  }
);

module.exports = mongoose.model("Cart", cartSchema);