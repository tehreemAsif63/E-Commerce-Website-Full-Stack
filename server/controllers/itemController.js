const express = require("express");

const router = express.Router();
const Item = require("../entities/Item");


router.post('/items', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, price, image } = req.body;

    // Create a new item document
    const newItem = new Item({
      name,
      price,
      image,
    });

    // Save the item to the MongoDB database
    await newItem.save();

    // Respond with a success message
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
/*
const fileUpload = require("express-fileupload");
const path = require("path");
router.use(fileUpload());


router.post('/items', async (req, res) => {
  // Check if the 'image' field is provided in the request body
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const image = req.files.image;
  const uploadPath = path.join(__dirname, 'uploads', image.name);

  try {
    // Move the uploaded file to the desired location
    await image.mv(uploadPath);

    // Store only the file name in the 'image' field
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      image: image.name, // Store the file name, not the full path
    });

    // Save the item to the database
    await newItem.save();

    res.json({ message: 'Item created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});*/


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

// Define a route to retrieve a list of items
router.get("/items", async (req, res) => {
  try {
    // Query the database to get all items
    const items = await Item.find();

    // Send the list of items as a JSON response
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
