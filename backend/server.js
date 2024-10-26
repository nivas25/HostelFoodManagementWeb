const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI and client
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoUri);

async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("UsersLoginDetails");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectToDb().then((db) => {
  // Login endpoint
  app.post("/api/login", async (req, res) => {
    const { username, password, userType } = req.body;

    try {
      const user = await db.collection("HostelResidents").findOne({
        username: username,
        password: password,
        userType: userType,
      });

      if (user) {
        res.status(200).json({ message: "Login successful", userType });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
