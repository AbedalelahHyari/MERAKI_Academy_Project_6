const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: { type: String, required },
  room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", messageSchema);
