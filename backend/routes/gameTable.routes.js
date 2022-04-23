const express = require("express");
const game_table = express.Router();
const GameTable = require("../controllers/gameTable.controller");

game_table.put("/createGame/", GameTable.createGameTable);

module.exports = game_table;
