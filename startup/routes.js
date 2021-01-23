const express = require("express");

const player = require("../routes/player");
const team = require("../routes/team");
const auction = require("../routes/auction");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/players", player);
  app.use("/api/teams", team);
  app.use("/api/auctions", auction);
};
