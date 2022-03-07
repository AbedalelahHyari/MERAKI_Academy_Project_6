const express = require("express");
const { createNewUser, getAllUsers } = require("../controllers/user");
const usersRouter = express.Router();
/******************************************************************************** */
usersRouter.post("/", createNewUser);
usersRouter.get("/", getAllUsers);

module.exports = usersRouter;
