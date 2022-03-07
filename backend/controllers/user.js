const userModel = require("../database/models/user");

const createNewUser = (req, res) => {
  const { name, email, password, age, gender, location, role } = req.body;
  const newUser = new userModel({
    name,
    email,
    password,
    age,
    gender,
    location,
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

module.exports = {
  createNewUser,
};
