const jwt = require("jsonwebtoken");
const express = require("express");
const secretJWTKey = require("./secretKey")
const Customer = require("../entities/Customer");
const Order = require("../entities/Order")
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/customers", async (req, res) => {
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
    res.status(201).json({ newCustomer,token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login/customers", async (req, res) => {
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
    const token = jwt.sign({ customer}, secretJWTKey, {
      expiresIn: "3d",
    });
    res.status(200).json({ token, customer });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/customers/validate-password', async (req, res) => {
  try {
    const { customerId, oldPassword } = req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    const passwordMatch = await bcrypt.compare(oldPassword, customer.password);
    if (passwordMatch) {
      res.status(200).json({ message: 'Password validation successful' });
    } else {
      res.status(401).json({ message: 'Invalid old password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json();
  }
});


//GET a customer by ID
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

// Change a customer's password
router.put('/customers/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { newPassword } = req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json();
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    customer.password = hashedPassword;
    await customer.save();

    res.status(200).json();
  } catch (error) {
    res.status(500).json();
  }
});


// Partially update a specific customer 
router.patch("/customers/:id",  async (req, res) => {
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

router.delete("/customers", async (req, res) => {
  try {
    await Customer.deleteMany({}); 
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customers." });
  }
});

router.get('/customers/:customerId/orders', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId).populate('orders');
    if (!customer) {
      return res.status(404).json();
    }
    res.status(200).json({ orders: customer.orders });
  } catch (error) {
    res.status(500).json();
  }
});

router.post('/customers/:customerId/orders', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404)
    }
    const newOrder = new Order({
      title: req.body.title,
      date: req.body.date,
      items: req.body.items,
    });
    await newOrder.save();
    customer.orders.push(newOrder._id);
    await customer.save();

    res.status(201).json({ order: newOrder });
  } catch (error) {
    res.status(500).json();
  }
});

router.delete('/customers/:customerId/orders/:orderId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const orderId = req.params.orderId;

    // Step 1: Find the customer by customerId
    const customer = await Customer.findById(customerId);

    // Step 2: Check if the customer exists
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Step 3: Check if the order exists in the customer's orders array
    const orderIndex = customer.orders.indexOf(orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found for the customer' });
    }

    // Step 4: Remove the order from the customer's orders array
    customer.orders.splice(orderIndex, 1);

    // Step 5: Delete the order from the Order collection
    await Order.findByIdAndDelete(orderId);

    // Step 6: Save the updated customer document
    await customer.save();

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
