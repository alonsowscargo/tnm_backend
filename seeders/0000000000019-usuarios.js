'use strict';
const bcrypt= require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('usuario', [
      {
       usuario:'rekkiem',
       nombre: 'Pablo',
       password: bcrypt.hashSync('123456',10),
       apellidos:'Barria Reyes',
       email:'pbarria.reyes@gmail.com',
       telefono:'+56976631136',
       rut:'16844428-1',
       fk_rol:1,
       estado:true
       //createdAt:'2020-11-24 00:00:00',
      // updatedAt:'2020-11-24 00:00:00'
    },
    {
      usuario:'evidal',
      nombre: 'Eduardo',
      password: bcrypt.hashSync('123456',10),
      apellidos:'Vidal',
       email:'edo.v80@gmail.com',
       telefono:'+56976631136',
       rut:'11111111-1',
       fk_rol:1,
       estado:true
      //createdAt:'2020-11-24 00:00:00',
      //updatedAt:'2020-11-24 00:00:00'
    },
    {
      usuario:'gabriel',
      nombre: 'Gabriel',
      password: bcrypt.hashSync('123456',10),
      apellidos:'Pezoa Riutor',
      email:'gabriel.pezoa@wscargo.cl',
      telefono:'+56956497756',
      rut:'19830647-9',
      fk_rol:1,
      estado:true
      //createdAt:'2020-11-24 00:00:00',
     // updatedAt:'2020-11-24 00:00:00'
   },
    {
      usuario:'comercial',
      nombre: 'COMERCIAL',
      password: bcrypt.hashSync('123456',10),
      apellidos:'TEST',
       email:'edo.v80@gmail.com',
       telefono:'+56976631136',
       rut:'11111111-1',
       fk_rol:2,
       estado:true
      //createdAt:'2020-11-24 00:00:00',
      //updatedAt:'2020-11-24 00:00:00'
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('usuario', null, {});
  }
};
