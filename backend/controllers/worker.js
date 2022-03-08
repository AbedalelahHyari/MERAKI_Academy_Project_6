const workerModel = require("../database/models/workerSchema");
const servicesModel = require("../database/models/service");

const workerProfile = (req, res) => {
  //const workerId = req.params._id;
  const { workImages, phone, status, ratePerHour, workerImage, profession } =
    req.body;
  const newWorker = new workerModel({
    workImages,
    phone,
    status,
    ratePerHour,
    workerImage,
    profession,
  });
  newWorker
    .save()
    .then((result) => {
      servicesModel
        .updateOne({ _id: profession }, { $push: { workers: req.params._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `The worker is added`,
            workerInfo: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `something went wrong while adding a new worker`,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  workerProfile,
};
