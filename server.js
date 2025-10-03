const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./user");

const app = express();
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.send("API is working done 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.error("MongoDB Error ❌", err));


app.post("/api/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user); // send the created user
    } catch (error) {
        res.status(400).json({ error: error.message }); // handle errors
    }
});

// Get Users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});