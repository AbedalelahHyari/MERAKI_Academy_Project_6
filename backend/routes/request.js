const express = require("express");

const {
  creatNewRequest,
  getAllRequests,
  getRequestsByWorkerId,
} = require("../controllers/requests");
const authentication = require("../middleware/authentication");
/**************************************************************** */

const requestRouter = express.Router();

requestRouter.post("/:id", authentication, creatNewRequest);
requestRouter.get("/", getAllRequests);
requestRouter.get("/:id", getRequestsByWorkerId);

module.exports = requestRouter;
