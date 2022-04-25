const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const prefix='/api/tipoCuentaBancaria';
const tipoCuentaBancariaController=require('../controllers/tipoCuentaBancariaCtrl');

app.get(`${prefix}`,verifyToken,tipoCuentaBancariaController.list);


module.exports=app;