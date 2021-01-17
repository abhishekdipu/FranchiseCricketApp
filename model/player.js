const mongoose = require("mongoose");
const Joi = require("joi");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  country: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 20,
  },
});

const Player = mongoose.model("Player", playerSchema);

const validate = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    country: Joi.string().min(2).max(20).required(),
  });

  return schema.validate(requestBody);
};

module.exports.Player = Player;
exports.validate = validate;
