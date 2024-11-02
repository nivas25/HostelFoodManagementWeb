const express = require("express");
const router = express.Router();
const {
  getResidentProfileMealSelection,
} = require("../../controller/resident/profileMealSelection");

router.get("/", getResidentProfileMealSelection);

module.exports = router;
