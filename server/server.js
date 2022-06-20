require('./config/config');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { request } = require('express')
const Sequelize=require('sequelize')
const cors = require('cors')
const fileupload = require("express-fileupload");
const fs = require('fs');
const https = require('https');
const http = require('http');
// var tareas_programadas = require('./controllers/tareas_programadas_ctrl.js');

/*
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 
}

*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(fileupload());
app.use(require('./routes/index'))

app.use(( err, req, res, next) => {
  return res.json({
    message: err.mesaage
  })
})

app.get('/', function (req, res) {
  res.json('Bienvenido al server express')
})


http.createServer({}, app).listen(3000, function(){
  console.log("My HTTP server listening on port 3000...");

  // tareas_programadas.wsc_enviar_factura()
  // tareas_programadas.generarPdfFacturas()
});

/*
https.createServer({
  key: fs.readFileSync('../wscargo/cargows.key'),
  cert: fs.readFileSync('../wscargo/cargows.crt')
}, app).listen(process.env.PORT, function(){
  console.log("My HTTPS server listening on port " + process.env.PORT + "...");
  //tareas_programadas.envio_etiquetas_clientes()
  //tareas_programadas.envio_notificacion_tarifas()
  //tareas_programadas.wsc_enviar_factura()
  //tareas_programadas.generarPdfFacturas()
  
});*/
 
