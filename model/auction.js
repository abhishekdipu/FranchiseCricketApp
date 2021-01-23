const Joi = require("joi");
const mongoose = require("mongoose");
//const Joi = require("joi");
const { playerSchema } = require("./player");
const { teamSchema } = require("./team");

//schema
const auctionSchema = new mongoose.Schema({
  team: {
    type: teamSchema,
    required: true,
  },
  player: {
    type: playerSchema,
    required: true,
  },
  auctionDate: {
    type: Date,
    default: Date.now,
  },
});
//model
const Auction = mongoose.model("Auction", auctionSchema);

//api schema validation
const validate = (requestBody) => {
  const schema = Joi.object({
    teamId: Joi.string().required(),
    playerId: Joi.string().required(),
  });

  return schema.validate(requestBody);
};

//exports

exports.Auction = Auction;
exports.validate = validate;
