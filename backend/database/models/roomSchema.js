const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
});

module.exports = mongoose.model("Room", roomSchema);
