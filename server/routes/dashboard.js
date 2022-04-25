const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const prefix='/api/dashboard';
const dashboardController=require('../controllers/dashboardCtrl');

app.get(`${prefix}/get_list_clients_pendings_replegal_doc`,verifyToken,dashboardController.getClientsPendingsRepLegalDoc);
app.get(`${prefix}/get_report_propuestas_comerciales/:fecha`,verifyToken,dashboardController.getReportPropuestasComerciales);
app.get(`${prefix}/get_report_clientes_creados/:fecha`,verifyToken,dashboardController.getReportClientesCreados);
app.get(`${prefix}/get_report_trackings_creados/:fecha`,verifyToken,dashboardController.getReportTrackingsCreados);


module.exports=app;