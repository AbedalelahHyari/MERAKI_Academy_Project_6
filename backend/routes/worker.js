const express = require("express");
const { workerProfile, getWorkerInfoById,updateImage} = require("../controllers/worker");
const workerRouter = express.Router();
/******************************************************************************** */
const authentication = require("../middleware/authentication");
/************************************************************* */
workerRouter.post("/:_id", authentication,workerProfile);
workerRouter.get("/:_id", getWorkerInfoById);
workerRouter.put("/:id",updateImage);

module.exports = workerRouter;
