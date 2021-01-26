const mongoose = require("mongoose");
const Joi = require("joi");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: "String",
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  createdOn: {
    type: "Date",
    default: Date.now,
  },
});

const Team = mongoose.model("Team", teamSchema);

const validate = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    owner: Joi.string().required().min(2).max(50),
    email: Joi.string().required().min(5).max(50).email(),
  });

  return schema.validate(requestBody);
};

module.exports.Team = Team;
module.exports.validate = validate;
exports.teamSchema = teamSchema;
