const express = require("express");
const router = express.Router();
const Item = require("../entities/Item");
const Review = require("../entities/Review");
const verifyToken = require("./authController")

router.post('/items', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const newItem = new Item({
      name,
      price,
      image,
    });
    await newItem.save();
    res.status(201).json({item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
});

router.get("/items",  async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
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
// GET all reviews for a specific item by ID
router.get('/items/:id/reviews', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId).populate('reviews');
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.status(200).json({ reviews: item.reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// POST a new review for a specific item by ID
router.post('/items/:id/reviews',  async (req, res) => {
  const { rating, comment } = req.body;
  const itemId = req.params.id;

  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({ message: 'Invalid rating. '});
  }
  const item = await Item.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }
  const newReview = new Review({ rating, comment, itemId });
  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
