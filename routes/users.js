const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authorization/auth");
const admin = require("../middleware/authentication/admin");

//create an users
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validate foe existing email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user is already register");

  user = new User(_.pick(req.body, ["name", "email", "password", "role"]));

  //hash and save the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "role"]));
});

// get current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//get all users : should have admin access
router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find().sort("createdOn").select("-password");
  res.send(users);
});

//delete an user: should have admin access
router.delete("/:id", [auth, admin], async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User Not Found");

  await User.deleteOne({ _id: user._id });
  res.status(204).send("User Deleted");
});
module.exports = router;
