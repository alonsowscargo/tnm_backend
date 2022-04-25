const { Sequelize } = require('sequelize');

module.exports = (sequelize,Sequelize) => {
	sequelize.define('comunas', {
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
        },
        fk_region: {
            type: Sequelize.INTEGER,
            references: {
                model: {
                    tableName: "region",
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
