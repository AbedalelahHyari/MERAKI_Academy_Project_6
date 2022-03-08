const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: { type: String, required: true },
});

module.exports = mongoose.model("Service", serviceSchema);
