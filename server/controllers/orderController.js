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
  } catch (error) {
    res.status(400).send({error:"invalid order data"});
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

// Partially update an order by id
router.patch("/orders/:orderId", async (req, res) => {
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

// Delete an order by id
router.delete("/orders/:orderId", async (req, res) => {
  try {
    const removedOrder = await Order.remove({ _id: req.params.orderId });
    res.send(removedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a new item for a specific order
router.post("/orders/:orderId/items", async (req, res) => {
  const item = new Item(req.body);
  try {
    const savedItem = await item.save();
    
    // Add the item to the order's items array
    const updatedOrder = await Order.updateOne(
      { _id: req.params.orderId },
      { $push: { items: savedItem._id } }
    );
    
    res.send(updatedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all items for a specific order
router.get("/orders/:orderId/items", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items');
    res.send(order.items);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
