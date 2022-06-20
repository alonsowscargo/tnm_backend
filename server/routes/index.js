const express = require('express')
const app = express()


app.use(require('./usuario'))
app.use(require('./login'))
app.use(require('./usuarioDirecciones'))
app.use(require('./bancos'))
app.use(require('./cuentasBancarias'))
app.use(require('./usuarioContactos'));
app.use(require('./usuarioCuentasBancarias'));
app.use(require('./region'));
app.use(require('./comunas'));
app.use(require('./usuarioNotas'));
app.use(require('./roles'));
app.use(require('./dashboard'));
app.use(require('./task'));
// app.use(require('./controlServicio'));


module.exports=app;
