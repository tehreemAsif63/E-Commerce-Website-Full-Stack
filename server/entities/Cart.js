const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
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
    
    },
    totalItems: {
      type: Number,
    
    },
    items: [cartItemSchema],
  }
);

module.exports = mongoose.model("Cart", cartSchema);
