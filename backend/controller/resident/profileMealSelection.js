// controllers/profileController.js
const Resident = require("../../models/resident/residentDetails"); // Assuming this is your resident model
const MealSelection = require("../../models/resident/mealSelection"); // Assuming this is your meal selection model

const getResidentProfileMealSelection = async (req, res) => {
  try {
    const residentId = req.residentId; // Adjust based on your authentication setup

    // Fetch resident profile from the Resident collection
    const resident = await Resident.findById(residentId);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    // Fetch meal selections for this resident from the MealSelection collection
    const mealSelections = await MealSelection.find({ residentId }); // Assuming residentId is the field in MealSelection

    // Combine and structure the response
    res.status(200).json({
      resident: {
        residentName: resident.residentName,
        email: resident.email,
        residentId: resident.residentId,
        address: resident.address,
      },
      mealSelections,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching profile data" });
  }
};

module.exports = { getResidentProfileMealSelection };
