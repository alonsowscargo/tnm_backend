'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('usuario_direcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pais:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      region:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      comuna:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      direccion:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitud:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      longitud:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      radio:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      usuario_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      direccion_tipo_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      observaciones:{
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('usuario_direcciones');
  }
};
