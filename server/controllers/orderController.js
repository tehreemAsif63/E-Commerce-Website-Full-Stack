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

// Create a new item for a specific order
router.post("/orders/:orderId/items", async (req, res) => {
  try {
    // Validate the request body to ensure it has the required fields
    if (!req.body.name || !req.body.price) {
      return res.status(400).send("Name and price are required fields.");
    }

    // Create a new item
    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      // Add any other fields you need
    });

    // Save the item
    const savedItem = await item.save();

    // Add the item to the order's items array
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $push: { items: savedItem._id } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }

    res.send(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get all items for a specific order in JSON format
router.get("/orders/:orderId/items", async (req, res) => {
  try {
    // Find the order by its ID, populate the "items" field, and execute the query
    const order = await Order.findById(req.params.orderId).populate('items').exec();

    // Check if the order exists
    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Return the items associated with the order in JSON format
    res.json(order.items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
