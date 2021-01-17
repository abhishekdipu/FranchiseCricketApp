const express = require("express");

const player = require("../routes/player");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/players", player);
};
