'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('usuario_cuentas_bancarias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      banco_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipo_cuenta_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cuenta: {
        type: Sequelize.TEXT
      },
      usuario_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('usuario_cuentas_bancarias');
  }
};
