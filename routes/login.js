const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  //verify body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate email and password
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid emailid or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid emailid or password");

  //send jwt
  const token = user.generateAuthToken();
  res.send(token);
});

const validate = (requestBody) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(20).email(),
    password: Joi.string().min(5).max(1024),
  });

  return schema.validate(requestBody);
};

module.exports = router;
