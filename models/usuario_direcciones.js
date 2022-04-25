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
	sequelize.define('usuario_direcciones', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
	id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nombre: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
    },
    pais: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
    },
    region: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
    },
    comuna: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
    },
    direccion: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
    },
    numero: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
        },
    latitud: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
        },
    longitud: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
        },
    radio: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
        },
	});
};