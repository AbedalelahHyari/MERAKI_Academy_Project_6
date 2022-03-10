const express = require("express");
const {
  createNewRoom,
  getAllRooms,
  getRoomById,
} = require("../controllers/room");
const roomsRouter = express.Router();
/******************************************************************************** */
roomsRouter.post("/", createNewRoom);
roomsRouter.get("/", getAllRooms);
roomsRouter.get("/single", getRoomById);

module.exports = roomsRouter;
