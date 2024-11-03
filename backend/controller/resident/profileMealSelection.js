const Resident = require("../../models/resident/residentDetails");
const MealSelection = require("../../models/resident/mealSelection");

const getResidentById = async (req, res) => {
  const residentId = req.params.residentID;
  try {
    const resident = await Resident.findOne({ residentID: residentId }); // Query by residentId
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.json(resident); // Return resident data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch meal selection details by resident ID
const getMealSelectionByResidentId = async (req, res) => {
  try {
    const residentId = req.params.residentID;
    const mealSelection = await MealSelection.find({
      residentId: residentId,
    });

    if (!mealSelection) {
      return res.status(404).json({ message: "Meal selection not found" });
    }

    res.status(200).json(mealSelection);
  } catch (error) {
    console.error("Error fetching meal selection:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getResidentById, getMealSelectionByResidentId };
