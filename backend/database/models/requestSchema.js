const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  status: { type: String, default: "pending" },
  requester:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
  
});

module.exports = mongoose.model("Request", requestSchema);
