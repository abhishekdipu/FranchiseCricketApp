const mongoose = require("mongoose");
const Joi = require("joi");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
});
