const express = require("express");
const router = express.Router();
const Cart = require("../entities/Cart");

// Create a new cart
router.post("/carts", async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const savedCart = await cart.save();
    res.status(201).send(savedCart); // Use 201 status for resource creation
  } catch (error) {
    res.status(400).send({ error: "Invalid input. Cart was not created" });
  }
});

// Delete an item from a cart
router.delete("/carts/:cartId/items/:itemId", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      { $pull: { items: { _id: req.params.itemId } } }, // Remove by item's _id
      { new: true } // To return the updated cart
    );
    if (!updatedCart) {
      return res.status(404).send("Cart not found");
    }
    res.send(updatedCart);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all carts
router.get("/carts", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.send(carts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get items of a specific cart
router.get("/carts/:cartId/items", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).send("Cart not found");
    }
    res.send(cart.items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Post item to a cart
router.post("/carts/:cartId/items", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    // Add the item to the cart's items array
    cart.items.push(req.body);
    const savedCart = await cart.save();

    res.status(201).send(savedCart);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get an item by ID from a specific cart
router.get("/carts/:cartId/items/:itemId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const item = cart.items.find((item) => item._id.toString() === req.params.itemId);
    if (!item) {
      return res.status(404).send("Item not found in the cart");
    }

    res.send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
