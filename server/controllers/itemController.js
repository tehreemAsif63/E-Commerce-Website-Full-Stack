const express = require("express");
const router = express.Router();
const Item = require("../entities/Item");

// Create a new item
router.post("/items", async (req, res) => {
  const item = new Item(req.body);
  try {
    const savedItem = await item.save();
    res.send(savedItem);
  } catch (error) {
    res.status(400).send({error: "Invalid data for item"});
  }
});

// Update an item(partially)
router.patch("/items/:itemId", async (req, res) => {
  try {
    const updatedItem = await Item.updateOne(
      { _id: req.params.itemId },
      { $set: req.body }
    );
    res.send(updatedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all items sorted by price (cheapest on top)
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ price: 1 });
    res.send(items);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get an item by id
router.get("/items/:itemId", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete all items
router.delete("/items", async (req, res) => {
  try {
    const removedItems = await Item.remove();
    res.send(removedItems);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an item
router.delete("/items/:itemId", async (req, res) => {
  try {
    const removedItem = await Item.remove({ _id: req.params.itemId });
    res.send(removedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
