const mongoose = require("mongoose");
const Joi = require("joi");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  country: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Player = mongoose.model("Player", playerSchema);

const validate = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    country: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(requestBody);
};

module.exports.playerSchema = playerSchema;
module.exports.Player = Player;
exports.validate = validate;
