'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('empresas', {
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
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('empresas');
    }
};
