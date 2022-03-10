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
module.exports = {
  createNewMessage,
};
