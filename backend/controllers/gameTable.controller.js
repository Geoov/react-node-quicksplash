const GameTable = require("../models/gameTable.model");
const { v4: uuidv4 } = require("uuid");

exports.createGameTable = async (req, res) => {
  let uuid = uuidv4().substring(0, 6);

  body = {
    id: uuid,
    id_host_user: 0,
    round_number: 0,
    users_number: 0,
    ready_players: 0,
  };

  GameTable.create(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the game.",
      });
    });
};

exports.updateGameTable = async (req, res) => {
  const id = req.params.id;

  GameTable.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "GameTable was updated successfully.",
        });
      } else if (num == 0) {
        res.status(404).send({
          message: `Cannot find GameTable with id=${id}.`,
        });
      } else {
        res.status(400).send({
          message: `Something is wrong. Cannot update GameTable with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating GameTable with id=" + id,
      });
    });
};
