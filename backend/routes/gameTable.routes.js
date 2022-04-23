const express = require("express");
const game_table = express.Router();
const GameTable = require("../controllers/gameTable.controller");

game_table.put("/createGame/", GameTable.createGameTable);

game_table.patch("/updateGame/:id", GameTable.updateGameTable);

module.exports = game_table;
