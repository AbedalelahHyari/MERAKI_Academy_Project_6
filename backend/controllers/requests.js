const requestsModel = require("../database/models/requestSchema");
const workerModel = require("../database/models/workerSchema");

const creatNewRequest = (req, res) => {
  const worker = req.params.id;
  const { status, requester } = req.body;
  const newRequest = new requestsModel({
    status,
    // requester:req.token.userId
    requester,
    worker,
  });

  newRequest
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `The request has been created Successfully`,
        Request: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email request exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

const getAllRequests = (req, res) => {
  requestsModel
    .find({}).populate("worker","name role _id").populate("requester","name role _id")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All The Requests`,
          Requests: result,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Requests Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `No Requests Yet`,
      });
    });
};

module.exports = {
  creatNewRequest,
  getAllRequests,
};
