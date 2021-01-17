const express = require("express");
const router = express.Router();

const { Player, validate } = require("../model/player");

//get all players
router.get("/", async (req, res) => {
  const players = await Player.find().sort();
  res.status(200).send(players);
});

//create players
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const player = new Player({ name: req.body.name, country: req.body.country });
  try {
    player = await player.save();
  } catch (e) {
    console.log(e.message);
  }

  res.send(player);
});

module.exports = router;
