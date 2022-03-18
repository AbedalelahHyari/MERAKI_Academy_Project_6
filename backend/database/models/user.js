const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  location: { type: String },
  phone: { type: String },
  role: { type: String, default: "User" },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dvg9eijgb/image/upload/v1647607298/bcg6pq6btoqnctwxcq0e.png",
  },
});
/******************************************************************************************************* */
// This function for hashing the password when the user make a register before saving in the data-base //
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
/************************************************************************************************* */
module.exports = mongoose.model("User", userSchema);
