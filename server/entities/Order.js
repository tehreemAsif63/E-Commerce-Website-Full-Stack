const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    items: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  }
);

module.exports = mongoose.model("Order", orderSchema);
