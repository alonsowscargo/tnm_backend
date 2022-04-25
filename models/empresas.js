const { Sequelize } = require('sequelize');

module.exports = (sequelize,Sequelize) => {
	sequelize.define('bodegas', {
		id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
		},
		estado: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				unique: false,
		},
		nombre: {
				allowNull: false,
				type: Sequelize.TEXT,
				unique: false,
		},
	});
};
