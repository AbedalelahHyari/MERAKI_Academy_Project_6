const express = require("express");
const { workerProfile } = require("../controllers/worker");
const workerRouter = express.Router();
/******************************************************************************** */
workerRouter.post("/:_id", workerProfile);


module.exports = workerRouter;
