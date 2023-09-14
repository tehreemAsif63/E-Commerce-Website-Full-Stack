const express = require("express");
const router = express.Router();
const Cart = require("../entities/Cart");

// Create 
router.post("/carts", async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const savedCart = await cart.save();
    res.send(savedCart);
  } catch (error) {
    res.status(400).send({error:"invalid input. Cart was not created"});
  }
});


// Update 
router.patch("/carts/:cartId", async (req, res) => {
  try {
    const updatedCart = await Cart.updateOne(
      { _id: req.params.cartId },
      { $set: req.body }
    );
    res.send(updatedCart);
  } catch (error) {
    res.status(400).send({error:"not updated"});
  }
});

// Delete item from a cart
router.delete("/carts/:cartId/items/:itemId", async (req, res) => {
  try {
    const updatedCart = await Cart.updateOne(
      { _id: req.params.cartId },
      { $pull: { items: { product: req.params.itemId } } }
    );
    res.send(updatedCart);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Add an item to a cart
router.post("/carts/:cartId/items/:itemId", async (req, res) => {
  try {
    const updatedCart = await Cart.updateOne(
      { _id: req.params.cartId },
      { $push: { items: { product: req.params.itemId } } }
    );
    res.send(updatedCart);
  } catch (err) {
    res.status(400).send(err);
  }
});





module.exports = router;
