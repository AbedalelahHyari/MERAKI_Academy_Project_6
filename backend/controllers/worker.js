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
    worker:req.token.userId,
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
    .findOne({worker:req.params._id}).populate("worker","name email _id").populate("profession")
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
/******************************************* */
const updateImage = (req, res) => {
  let worker_profile = req.params.id;

  workerModel
    .findOneAndUpdate({worker:worker_profile}, req.body, { new: true })
    .then((result) => {
      if (result == null) {
        return res.status(404).json({
          success: false,
          massage: `The user ==> ${userId} Not Found`,
        });
      }
      res.status(202).json({
        success: true,
        massage: `Success Image updated`,
        vid: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        massage: `The Image for ==> ${userId} Not Found`,
        err,
      });
    });
};

module.exports = {
  workerProfile,
  getWorkerInfoById,
  updateImage
};
