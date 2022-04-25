'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut: {
        type: Sequelize.STRING
      },
      usuario: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      fk_rol:{
        type: Sequelize.INTEGER,
        allowNull:true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuario');
  }
};