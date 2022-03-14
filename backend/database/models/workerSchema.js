const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema({
  profession: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  workImages: { type: Array },
  status: { type: String },
  description: { type: String },
  ratePerHour: { type: Number },
  workerImage: {
    type: String,
  },
  worker:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Worker", workerProfileSchema);
