const express = require("express");
const router = express.Router();
const {
  saveMealSelection,
} = require("../../controller/resident/mealSelection");
const { incrementCount } = require("../../controller/resident/mealCount");

router.post("/save", saveMealSelection);
router.post("/increment", incrementCount);

module.exports = router;
