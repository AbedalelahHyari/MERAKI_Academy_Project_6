const express = require("express");
const { createNewUser } = require("../controllers/user");
const usersRouter = express.Router();
/******************************************************************************** */
usersRouter.post("/", createNewUser);

module.exports = usersRouter;
