var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

const GameTable = sequelize.define('game_table', {
    id: {
		type: Sequelize.STRING(195),
		autoIncrement: false,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
    id_host_user: {
		type: Sequelize.STRING(195),
		allowNull: false,
	},
    round_number: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	users_number: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	ready_players: {
        type: Sequelize.INTEGER,
		allowNull: false,
	},
}, {
    timestamp: false,
    createAt: false,
    paranoid: false
});

module.exports = GameTable