const servicesModel = require("../database/models/service");

const createNewService = (req, res) => {
  const { name, description } = req.body;
  const newService = new servicesModel({
    name,
    description,
  });
  newService
    .save()
    .then((service) => {
      res.status(201).json({
        success: true,
        message: `The service has been created Successfully`,
        service: service,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The service already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
/******************************************************************************************************** */
const getAllServices = (req, res) => {
  servicesModel
    .find({}).populate("workers","name _id role")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All The services`,
          services: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No services Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `No services Yet`,
      });
    });
};

module.exports = {
  createNewService,
  getAllServices,
};
