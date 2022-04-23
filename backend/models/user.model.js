var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

const User = sequelize.define('user', {
    id: {
		type: Sequelize.STRING(195),
		autoIncrement: false,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
    id_game_table: {
		type: Sequelize.STRING(195),
		allowNull: false,
	},
    name: {
		type: Sequelize.STRING(195),
		allowNull: false,
	},
	votes: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	color: {
        type: Sequelize.STRING(45),
		allowNull: false,
	},
}, {
    timestamp: false,
    createAt: false,
    paranoid: false
});

module.exports = User