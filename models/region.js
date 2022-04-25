const { Sequelize } = require('sequelize');

module.exports = (sequelize,Sequelize) => {
	sequelize.define('region', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
        },
        codigo: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: false,
        },
        nombre: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: false,
        },
        fk_pais: {
            type: Sequelize.INTEGER,
            references: {
                model: {
                    tableName: "pais",
                    schema: "public"
                },
                key: "id",
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT",
            },
            allowNull: false
        }
	});
};