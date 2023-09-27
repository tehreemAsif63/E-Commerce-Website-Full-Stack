const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../entities/Customer");
const Order = require("../entities/Order");
const secretJWTKey = require("./secretKey")

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {

    const decoded = jwt.verify(token, secretJWTKey);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};


router.post("/signup/customer", async (req, res) => {
  try {
    const { email, password, name, lastName } = req.body;
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      email,
      password: hashedPassword,
      name,
      lastName,
    });
    await newCustomer.save();
    const token = jwt.sign({ customerId: newCustomer._id }, secretJWTKey, {
      expiresIn: "3d",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/login/customer", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ customerId: customer._id }, secretJWTKey, {
      expiresIn: "3d",
    });
    res.status(200).json({ token, customer });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET all orders for a customer
router.get('/customers/:customerId/orders', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId).populate('orders');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ orders: customer.orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new order for a customer
router.post('/customers/:customerId/orders', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create a new order
    const newOrder = new Order({
      title: req.body.title,
      date: req.body.date,
      items: req.body.items,
      // Add other order attributes as needed
    });

    // Save the order
    await newOrder.save();

    // Update the customer's orders array with the new order's ID
    customer.orders.push(newOrder._id);
    await customer.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


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
router.post("/customers", verifyToken, async (req, res) => {
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
// Retrieve a customer by ID
router.get("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a customer by ID (PUT)
router.put("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: "Invalid customer data" });
  }
});

// Partially update a customer by ID (PATCH)
router.patch("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
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
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(removedCustomer);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});




module.exports = router;
