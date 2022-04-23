const GameTable = require("../models/gameTable.model");
const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

exports.createGameTable = async (req, res) => {
  let uuid = uuidv4();

  body = {
    id: uuid,
    id_host_user: 0,
    round_number: 0,
    users_number: 0,
    ready_players: 0
  };

  GameTable.create(body)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the diploma.",
      });
    });
};
