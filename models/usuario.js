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

const { Sequelize } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize,Sequelize) => {
	sequelize.define('usuario', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
    },
    rut: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: true,
    },
    usuario: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: true,
    },
	nombre: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: false,
    },
    password: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: false,
    },
    apellidos: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: false,
    },
    email: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: false,
    },
    telefono: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: false,
		},
	});
};