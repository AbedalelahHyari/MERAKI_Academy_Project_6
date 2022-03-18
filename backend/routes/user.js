const express = require("express");
const {
  createNewUser,
  getAllUsers,
  getUserById,updateImage
} = require("../controllers/user");
const usersRouter = express.Router();
/******************************************************************************** */
usersRouter.post("/", createNewUser);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);


module.exports = usersRouter;
