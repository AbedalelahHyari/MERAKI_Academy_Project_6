const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema({
  profession: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  workImages: { type: String },
  status: { type: String },
  description: { type: String },
  ratePerHour: { type: Number },
  workerImage: {
    type: String, default:"https://res.cloudinary.com/dvg9eijgb/image/upload/v1647607298/bcg6pq6btoqnctwxcq0e.png"
  },
  worker:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Worker", workerProfileSchema);
