const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const prefix='/api/usuarioDirecciones';
const usuarioDireccionesController=require('../controllers/usuarioDireccionesCtrl');

app.get(`${prefix}/:id`,verifyToken,usuarioDireccionesController.list);


app.post(`${prefix}`,verifyToken, usuarioDireccionesController.create)

app.delete(`${prefix}/:id`,verifyToken, usuarioDireccionesController.delete)

app.put(`${prefix}/:id`,verifyToken, usuarioDireccionesController.update)
/*
app.put(`${prefix}/:id`, function (req, res) {
    let id=req.params.id;
    res.json({id})
})

app.delete(`${prefix}`, function (req, res) {
    res.json('Método delete Usuarios')
})*/

module.exports=app;