'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
  {

    await queryInterface.bulkInsert('empresas', [
      {
        estado:true
        , nombre:'WSCARGO'
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) =>
  {
     await queryInterface.bulkDelete('empresas', null, {});
  }
};
