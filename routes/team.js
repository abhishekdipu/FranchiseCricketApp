const express = require("express");
const router = express.Router();
const { Team, validate } = require("../model/team");
const { Player } = require("../model/player");

/////////////////////////////////
//get all
router.get("/", async (req, res) => {
  //get all entity from db
  const teams = await Team.find();

  //return
  res.send(teams);
});

////////////////////////////////
//get by id
router.get("/:id", async (req, res) => {
  //look for team in db
  const team = await Team.findById(req.params.id);
  //if not found
  if (!team) return res.status(404).send("Team Not Found");

  //return
  res.send(team);
});

////////////////////////////////
//create entity
router.post("/", async (req, res) => {
  //validate requestBody schema
  const { error } = validate(req.body);
  //if error present in requestBody
  if (error) return res.status(400).send(error.details[0].message);

  //   //check for players
  //   const player = await Player.findById(req.body.playersId);
  //   if (!player) return res.status(400).send("Player does not exist");

  //create entity object
  const team = new Team({
    name: req.body.name,
    owner: req.body.owner,
    // players: { _id: player._id, name: player.name, country: player.country },
  });

  //save entiy to db
  try {
    team = await team.save(team);
  } catch (err) {
    console.log(err.message);
  }

  //return saved entity to respose
  res.send(team);
});

////////////////////////////////
//update entity
router.put("/:id", async (req, res) => {
  //look for the id in db
  const team = await Team.findById(req.params.id);
  //if entity not Found
  if (!team) return res.status(404).send("Team Not Found");

  //validate requestBody
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update entity
  try {
    team = await Team.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        owner: req.body.owner,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err.message);
  }
  res.send(team);
});

////////////////////////////////
//delete entity

router.delete("/:id", async (req, res) => {
  //look for entity in db
  const team = await Team.findById(req.params.id);
  if (!team) return res.status(404).send("Team Not Found");

  //delete entity
  try {
    team = await Team.deleteOne({ _id: req.params.id }, { new: true });
  } catch (err) {
    console.log(err.message);
  }

  res.send(team);
});

module.exports = router;
