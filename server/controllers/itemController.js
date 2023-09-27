const express = require("express");
const router = express.Router();
const Item = require("../entities/Item");


router.post('/items', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const newItem = new Item({
      name,
      price,
      image,
    });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
  
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


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


router.get("/items",  async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
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
    const removedItems = await Item.deleteMany({});
    res.send(removedItems);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an item by ID
router.delete("/items/:itemId", async (req, res) => {
  try {
    const removedItem = await Item.findByIdAndRemove(req.params.itemId);
    if (!removedItem) {
      return res.status(404).send("Item not found");
    }
    res.send(removedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
