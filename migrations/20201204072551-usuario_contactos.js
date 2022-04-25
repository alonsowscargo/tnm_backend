'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('usuario_contactos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      telefono2: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      forma_cargo:{
        type: Sequelize.STRING
      },
      comentario:{
        type: Sequelize.TEXT
      },
      contacto_tipo_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
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
     await queryInterface.dropTable('usuario_contactos');
  }
};
