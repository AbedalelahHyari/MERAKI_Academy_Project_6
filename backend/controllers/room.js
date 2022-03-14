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
/******************************/
/******************************* */
const getAllRooms = (req, res) => {
  roomModel
    .find({})
    .populate({ path: "room_ID", populate: { path: "worker requester" } })
    //.populate("worker")
    .then((rooms) => {
      if (rooms.length) {
        res.status(200).json({
          success: true,
          message: `All The Rooms`,
          rooms: rooms,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Rooms Yet`,
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

/************************************************************************ */
const getRoomById = (req, res) => {
  //const { room_ID } = req.body;
  const room_ID = req.params.id;
  //.find({ worker: worker_id })

  roomModel
    .findOne({ room_ID })
    .populate("room_ID")
    .then((result) => {
      // if (!result) {
      //   console.log("no");
      //   return res.status(404).json({
      //     success: false,
      //     message: `The room not found`,
      //   });
      // }
      res.status(200).json({
        success: true,
        message: `${room_ID}`,
        room: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  createNewRoom,
  getAllRooms,
  getRoomById,
};
