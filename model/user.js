const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

//schema
const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  email: {
    type: "String",
    minlength: 5,
    maxlength: 256,
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    minlength: 5,
    maxlength: 1024,
    required: true,
  },

  createdOn: {
    type: "Date",
    default: Date.now,
  },

  role: {
    type: "String",
    enum: ["owner", , "admin", "teamManager", "playerManager", "fan"],
    default: "fan",
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwtPrivateKey")
  );
  return token;
};

//model
const User = mongoose.model("User", userSchema);

//api schema validation
const validate = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(20),
    email: Joi.string().required().min(5).max(256).email(),
    password: Joi.string().required().min(5).max(1024),
    role: Joi.string(),
  });

  return schema.validate(requestBody);
};

//exports
module.exports.User = User;
module.exports.validate = validate;
