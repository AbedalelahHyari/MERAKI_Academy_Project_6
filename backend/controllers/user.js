const userModel = require("../database/models/user");

const createNewUser = (req, res) => {
  const { name, email, password, age, gender, location, phone, role } =
    req.body;
  const newUser = new userModel({
    name,
    email,
    password,
    age,
    gender,
    location,
    phone,
    role,
  });
  newUser
    .save()
    .then((user) => {
      res.status(201).json({
        success: true,
        message: `The User has been created Successfully`,
        user: user,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
/******************************* */
const getAllUsers = (req, res) => {
  userModel
    .find({})
    .populate("role", "-__v -_id")
    .then((users) => {
      if (users.length) {
        res.status(200).json({
          success: true,
          message: `All The Users`,
          users: users,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Users Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `No users Yet`,
      });
    });
};
/************************************************************************ */
const getUserById = (req, res) => {
  let user_id = req.params.id;
  userModel
    .findById(user_id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The user with id ===> ${user_id}`,
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
  createNewUser,
  getAllUsers,
  getUserById,
};
