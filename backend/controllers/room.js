const roomModel = require("../database/models/roomSchema");

const createNewRoom = (req, res) => {
  const { room_ID } = req.body;
  const newRoom = new roomModel({
    room_ID,
  });
  newRoom
    .save()
    .then((room) => {
      res.status(201).json({
        success: true,
        message: `The Room has been created Successfully`,
        room: room,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The room already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
module.exports = {
  createNewRoom,
  
};
