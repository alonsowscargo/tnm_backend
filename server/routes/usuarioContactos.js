const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const prefix='/api/usuarioContactos';
const usuarioContactosController=require('../controllers/usuarioContactosCtrl');

app.get(`${prefix}/:usuario_id`,verifyToken,usuarioContactosController.list);


app.post(`${prefix}`,verifyToken, usuarioContactosController.create)

app.delete(`${prefix}/:id`,verifyToken, usuarioContactosController.delete)

app.put(`${prefix}/:id`,verifyToken, usuarioContactosController.update)
/*
app.put(`${prefix}/:id`, function (req, res) {
    let id=req.params.id;
    res.json({id})
})

app.delete(`${prefix}`, function (req, res) {
    res.json('Método delete Usuarios')
})*/

module.exports=app;