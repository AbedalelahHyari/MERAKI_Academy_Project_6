const workerModel = require("../database/models/workerSchema");
const servicesModel = require("../database/models/service");

const workerProfile = (req, res) => {
  const {
    profession,
    workImages,
    status,
    description,
    ratePerHour,
    workerImage,
  } = req.body;
  /************************************* */
  const newWorker = new workerModel({
    profession,
    workImages,
    status,
    description,
    ratePerHour,
    workerImage,
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
/**************************************************************************************** */
const getWorkerInfoById = (req, res) => {
  let worker_id = req.params._id;
  workerModel
    .findById(worker_id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The worker not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The worker with id ===> ${worker_id}`,
        user: result,
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
  getWorkerInfoById,
};
