const messageModel = require("../database/models/messageSchema");

const createNewMessage = (req, res) => {
  const { message, room_id } = req.body;
  let sender_id = req.token.userId;
  const newMessage = new messageModel({
    message,
    room_id,
    sender_id,
  });
  newMessage
    .save()
    .then((message) => {
      res.status(201).json({
        success: true,
        message: `The message has been created Successfully`,
        message: message,
      });
    })
    .catch((err) => {
      if (err) {
        res.status(409).json({
          success: false,
          message: `Something went wrong while creating new Message`,
        });
      }
    });
};
/********************************** */

const getAllMessages = (req, res) => {
  messageModel
    .find({})
    .populate({
      path: "room_id",
      populate: { path: "room_ID", populate: { path: "worker requester" } },
    })
    //.populate("room_id")
    .then((messages) => {
      if (messages.length) {
        res.status(200).json({
          success: true,
          message: `All The messages`,
          messages: messages,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No messages Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
/******************************************************** */
module.exports = {
  createNewMessage,
  getAllMessages
};
