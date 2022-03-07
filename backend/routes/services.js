const express = require("express");
const { createNewService } = require("../controllers/services");
const servicesRouter = express.Router();
/******************************************************************************** */
servicesRouter.post("/", createNewService);

module.exports = servicesRouter;
