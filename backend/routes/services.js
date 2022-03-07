const express = require("express");
const { createNewService, getAllServices } = require("../controllers/services");
const servicesRouter = express.Router();
/******************************************************************************** */
servicesRouter.post("/", createNewService);

servicesRouter.get("/", getAllServices);
module.exports = servicesRouter;
