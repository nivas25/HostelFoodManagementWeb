const Resident = require("../../models/resident/residentDetails");

// Login route
const residentLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the resident by username
    const resident = await Resident.findOne({ username });

    // Check if resident exists
    if (!resident) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored password
    if (resident.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If login is successful
    res.status(200).json({
      message: "Login successful",
      userId: resident._id,
      residentname: resident.residentname,
      residentID: resident.residentID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { residentLogin };
