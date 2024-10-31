const mongoose = require("mongoose");

const mealSelectionSchema = new mongoose.Schema({
  residentName: { type: String, required: true },
  residentId: { type: String, required: true },
  bookedDay: { type: String, required: true }, // Consider changing to Date if you're storing actual dates
  selection: {
    type: String,
    enum: ["Yes", "No", "Yes I will Eat"], // Add any additional valid options here
    required: true,
  },
  breakfastDish: { type: String, required: true }, // Assuming breakfast is mandatory
  lunchDish: { type: String, required: true }, // Assuming lunch is mandatory
  dinnerDish: { type: String, required: true }, // Assuming dinner is mandatory
});

// Create the MealSelection model
const MealSelection = mongoose.model("MealSelection", mealSelectionSchema);

module.exports = MealSelection;
