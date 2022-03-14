const express = require("express");
const { workerProfile, getWorkerInfoById } = require("../controllers/worker");
const workerRouter = express.Router();
/******************************************************************************** */
const authentication = require("../middleware/authentication");
/************************************************************* */
workerRouter.post("/:_id", authentication,workerProfile);
workerRouter.get("/:_id", getWorkerInfoById);

module.exports = workerRouter;
