const mongoose = require("mongoose");
const Joi = require("joi");
const { playerSchema } = require("./player");

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

  players: {
    type: [playerSchema],
    required: false,
  },
});

const Team = mongoose.model("Team", teamSchema);

const validate = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    owner: Joi.string().required().min(2).max(50),
    playersId: Joi.string(),
  });

  return schema.validate(requestBody);
};

module.exports.Team = Team;
module.exports.validate = validate;
exports.teamSchema = teamSchema;
