const express = require('express')
const app = express()
const prefix='/api/token';
const authenticationController=require('../controllers/authenticationCtrl');

app.post(`${prefix}`,authenticationController.postToken);

module.exports=app;