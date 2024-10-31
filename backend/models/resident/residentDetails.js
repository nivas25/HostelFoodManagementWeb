const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  residentname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phoneNo: { type: String, required: true },
  residentID: { type: String, required: true, unique: true }, // This will be set when creating the resident
});

const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;
