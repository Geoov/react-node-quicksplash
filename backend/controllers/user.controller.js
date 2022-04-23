const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const { getNextColor } = require("../common/helpers");

index = 0;

exports.createUser = async (req, res) => {
  let uuid = uuidv4().substring(0, 4);
  currentColor = await getNextColor(index);

  body = {
    id: uuid,
    id_game_table: req.body.id_game_table,
    name: req.body.name,
    votes: 0,
    color: currentColor,
  };

  index = index + 1;
  if (index > 8) {
    index = 0;
  }

  console.log(body);

  User.create(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the yser.",
      });
    });
};
