/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class usuario extends Model {
    
    static associate(models) {
    }
  };
  usuario.init({
    id: Sequelize.INTEGER,
    nombre: Sequelize.STRING,
    password: Sequelize.STRING
  }, {
    sequelize,
    modelName: 'usuario',
    define:{
      schema: "public"
    }
  });
  return usuario;
};*/

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("task", {
	id: DataTypes.TEXT,
	title: DataTypes.TEXT,
	description: DataTypes.TEXT,
});