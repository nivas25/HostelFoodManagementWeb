const express = require("express");
const router = express.Router();
const { residentLogin } = require("../../controller/resident/login");

router.post("/", residentLogin);

module.exports = router;
