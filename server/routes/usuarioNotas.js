const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const prefix='/api/usuarioNotas';
const usuarioNotasController=require('../controllers/usuarioNotasCtrl');

app.get(`${prefix}/:usuario_id`,verifyToken,usuarioNotasController.list);


app.post(`${prefix}`,verifyToken, usuarioNotasController.create)

app.delete(`${prefix}/:id`,verifyToken, usuarioNotasController.delete)

app.put(`${prefix}/:id`,verifyToken, usuarioNotasController.update)
/*
app.put(`${prefix}/:id`, function (req, res) {
    let id=req.params.id;
    res.json({id})
})

app.delete(`${prefix}`, function (req, res) {
    res.json('Método delete Usuarios')
})*/

module.exports=app;