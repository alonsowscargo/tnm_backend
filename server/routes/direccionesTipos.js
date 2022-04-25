const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const prefix='/api/direcciones_tipos';
const direccionesTiposController=require('../controllers/direccionesTiposCtrl');

app.get(`${prefix}`,verifyToken,direccionesTiposController.list);

app.get(`${prefix}/:id`,verifyToken, direccionesTiposController.findOneBy)

app.post(`${prefix}`,verifyToken, direccionesTiposController.create)

app.put(`${prefix}`,verifyToken, direccionesTiposController.update)

app.delete(`${prefix}/:id`,verifyToken, direccionesTiposController.delete)

module.exports=app;