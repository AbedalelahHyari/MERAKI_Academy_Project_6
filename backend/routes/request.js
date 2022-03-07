const express = require("express");

const { creatNewRequest ,getAllRequests} = require("../controllers/requests");
/**************************************************************** */

const requestRouter = express.Router();

requestRouter.post("/:id",creatNewRequest);
requestRouter.get("/",getAllRequests);

module.exports = requestRouter;