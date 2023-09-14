const express = require("express");
const router = express.Router();
const Customer = require("../entities/Customer");
const Order = require("../entities/Order"); 

// to find a customer by ID
const findCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    req.customer = customer;
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new customer
router.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: "Invalid customer data" });
  }
});
//retreive all customers
router.get("/customers", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  try {
    const customers = await Customer.find()
      .skip(skip)
      .limit(limit);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// retreive a customer by ID
router.get("/customers/:id", findCustomerById, (req, res) => {
  res.status(200).json(req.customer);
});

//Fully replace a customer by ID
router.put("/customers/:id", findCustomerById, async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: "Invalid customer data" });
  }
});
//partially update a customer
router.patch("/customers/:id", findCustomerById, async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});
// Delete a customer by ID
router.delete("/customers/:id", async (req, res) => {
  try {
    const removedCustomer = await Customer.findByIdAndRemove(req.params.id);
    if (!removedCustomer) {
      return res.status(404).send("Customer not found");
    }
    res.send(removedCustomer);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Create an order for a specific user
router.post('/customers/:customer_id/orders', async (req, res) => {
  try {
    const { title, date } = req.body;
    const customer = await Customer.findById(req.params.customer_id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const newOrder = new Order({ title, date });
    await newOrder.save();

    customer.orders.push(newOrder);
    await customer.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Get all orders for a customer
router.get("/customers/:customer_id/orders", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customer_id).populate("orders");

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer.orders);
  } catch (error) {
    res.status(400).json({ error: "Invalid customer data" });
  }
});

// Delete an order of a customer
router.delete("/customers/:customer_id/orders/:order_id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customer_id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const order = await Order.findByIdAndDelete(req.params.order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    customer.orders.pull(order);
    await customer.save();

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Get an order of a customer
router.get("/customers/:customer_id/orders/:order_id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customer_id).populate("orders");

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const order = customer.orders.find(o => o._id.toString() === req.params.order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: "Invalid order data" });
  }
});




module.exports = router;
