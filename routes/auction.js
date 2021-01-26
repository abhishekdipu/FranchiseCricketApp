const express = require("express");
const router = express.Router();
const { Auction, validate } = require("../model/auction");
const { Player } = require("../model/player");
const { Team } = require("../model/team");
const auth = require("../middleware/authorization/auth");
const teamManager = require("../middleware/authentication/teamManager");

const mongoose = require("mongoose");
const Fawn = require("fawn"); //for transaction
Fawn.init(mongoose); //initialize fawn with mongoose object

//apis

//get all auctions
router.get("/", async (req, res) => {
  const auctions = await Auction.find();
  res.send(auctions);
});

//make a auction
router.post("/", [auth, teamManager], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //look for player
  const player = await Player.findById(req.body.playerId);
  if (!player) return res.status(400).send("Player not found");

  const isPlayerAvailable = player.isAvailable;
  if (!isPlayerAvailable) return res.status(400).send("player is not availble");

  //look for team
  const team = await Team.findById(req.body.teamId);
  if (!team) return res.status(400).send("Team not found");

  //get the available player list from team
  const allPlayers = team.players;

  //create an auction , add player to the team, change isAvailable status of player to false
  const auction = new Auction({
    team: { _id: team._id, name: team.name, owner: team.owner },
    player: { _id: player._id, name: player.name },
  });

  try {
    new Fawn.Task()
      .save("auctions", auction)
      .update(
        "teams",
        {
          _id: team._id,
        },
        { $push: { players: player } }
      )
      .update("players", { _id: player._id }, { isAvailable: false })
      .run();
    res.send(auction);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
});

//exports
module.exports = router;
