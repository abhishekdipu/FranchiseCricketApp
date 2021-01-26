const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/authorization/auth");
const playerManager = require("../middleware/authentication/playerManager");

const { Player, validate } = require("../model/player");

//get all
router.get("/", async (req, res) => {
  const players = await Player.find().sort("createdOn");
  //throw new Error("demo error occured");
  res.status(200).send(players);
});

//get by id
router.get("/:id", async (req, res) => {
  //check if it's in object id format
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) return res.status(404).send("Player Not Found");

  //check for id in db
  const player = await Player.findById(req.params.id);

  //validation for id
  if (!player) return res.status(404).send("Player Not Found");

  //sending response
  res.send(player);
});

////////////////////////////////////////////////////////////////
//create players
router.post("/", [auth, playerManager], async (req, res) => {
  //validation for body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check for existing player
  let player = await Player.findOne({ email: req.body.email });
  if (player) return res.status(400).send("Player already registered");

  //save body to db
  player = new Player(_.pick(req.body, ["name", "country", "email"]));

  player = await player.save();

  //sending response
  res.send(player);
});

//////////////////////////////////////////////////////////////
//update players
router.put("/:id", [auth, playerManager], async (req, res) => {
  //check for id in db
  let player = await Player.findById(req.params.id);
  //validation for id
  if (!player) return res.status(404).send("Player Not Found");

  //validation for body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update body in db
  player = await Player.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      country: req.body.country,
    },
    { new: true }
  );

  res.send(player);
});

//////////////////////////////////////////////////////////////////
//delete player
router.delete("/:id", [auth, playerManager], async (req, res) => {
  //check for id in db
  const player = await Player.findById(req.params.id);

  //validation for id
  if (!player) return res.status(404).send("Player Not Found");

  //delete entity if found
  try {
    player = await Player.deleteOne({ _id: req.params.id }, { new: true });
  } catch (e) {
    console.log(e.message);
  }

  res.send(player);
});

module.exports = router;
