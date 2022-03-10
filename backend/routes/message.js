const express = require("express");
const {
  createNewMessage,
  getAllMessages,
  getMessagesByRoomId,
} = require("../controllers/message");
const authentication = require("../middleware/authentication");
const messagesRouter = express.Router();
/******************************************************************************** */
messagesRouter.post("/", authentication, createNewMessage);
messagesRouter.get("/", getAllMessages);
messagesRouter.get("/room", getMessagesByRoomId);

module.exports = messagesRouter;
