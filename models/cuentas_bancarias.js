const { Sequelize } = require('sequelize');

module.exports = (sequelize,Sequelize) => {
	sequelize.define('cuentas_bancarias', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
        },
        nombre: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: false,
        },
	});
};