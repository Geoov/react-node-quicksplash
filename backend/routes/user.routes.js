const express = require("express");
const user = express.Router();
const User = require("../controllers/user.controller");

user.put("/createUser/", User.createUser);

module.exports = user;
