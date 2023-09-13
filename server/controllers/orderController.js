const express = require("express");
const router = express.Router();
const Order = require("../entities/Order");
const Item = require("../entities/Item");

// Create a new order
router.post("/orders", async (req, res) => {
  const order = new Order(req.body);
  try {
    const savedOrder = await order.save();
    res.send(savedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Get all orders
router.get("/orders", async (req, res) => {
    try {
      const orders = await Order.find().populate('items');
      res.send(orders);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  // Get an order by id
router.get("/orders/:orderId", async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId).populate('items');
      res.send(order);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Update an order by id
  router.put("/orders/:orderId", async (req, res) => {
    try {
      const updatedOrder = await Order.updateOne(
        { _id: req.params.orderId },
        { $set: req.body }
      );
      res.send(updatedOrder);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  