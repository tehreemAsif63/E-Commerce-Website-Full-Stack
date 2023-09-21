const express = require("express");
const router = express.Router();
const Item = require("../entities/Item");
const path = require("path");
const fs = require("fs");

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.post('/items', upload.single('image'), (req, res) => {
 
  var obj = {
      name: req.body.name,
      price: req.body.price,
      imagr: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  imgSchema.create(obj)
  .then ((err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/');
      }
  });
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
