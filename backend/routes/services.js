const express = require("express");
const {
  createNewService,
  getAllServices,
  getServiceById,
} = require("../controllers/services");
const servicesRouter = express.Router();
/******************************************************************************** */
servicesRouter.post("/", createNewService);

servicesRouter.get("/", getAllServices);
servicesRouter.get("/:id", getServiceById);

module.exports = servicesRouter;
