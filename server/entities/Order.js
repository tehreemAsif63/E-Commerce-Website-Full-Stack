const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  }
);

module.exports = mongoose.model("Order", orderSchema);
