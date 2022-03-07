const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  location: { type: String },
});
/******************************************************************************************************* */
// This function for hashing the password when the user make a register before saving in the data-base //
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
/************************************************************************************************* */
module.exports = mongoose.model("Customer", customerSchema);
