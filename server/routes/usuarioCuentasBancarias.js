const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const prefix='/api/usuarioCuentasBancarias';
const usuarioCuentasBancariasController=require('../controllers/usuarioCuentasBancariasCtrl');

app.get(`${prefix}/:usuario_id`,verifyToken,usuarioCuentasBancariasController.list);


app.post(`${prefix}`,verifyToken, usuarioCuentasBancariasController.create)

app.delete(`${prefix}/:id`,verifyToken, usuarioCuentasBancariasController.delete)

app.put(`${prefix}/:id`,verifyToken, usuarioCuentasBancariasController.update)
/*
app.put(`${prefix}/:id`, function (req, res) {
    let id=req.params.id;
    res.json({id})
})

app.delete(`${prefix}`, function (req, res) {
    res.json('Método delete Usuarios')
})*/

module.exports=app;