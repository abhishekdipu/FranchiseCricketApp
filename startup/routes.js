const express = require("express");

const player = require("../routes/player");
const team = require("../routes/team");
const auction = require("../routes/auction");
const users = require("../routes/users");
const login = require("../routes/login");

const error = require("../middleware/error/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/players", player);
  app.use("/api/teams", team);
  app.use("/api/auctions", auction);
  app.use("/api/users", users);
  app.use("/api/login", login);

  app.use(error); //for handeling express sync error
};
