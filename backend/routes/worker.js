const express = require("express");
const { workerProfile, getWorkerInfoById } = require("../controllers/worker");
const workerRouter = express.Router();
/******************************************************************************** */
workerRouter.post("/:_id", workerProfile);
workerRouter.get("/:_id", getWorkerInfoById);

module.exports = workerRouter;
