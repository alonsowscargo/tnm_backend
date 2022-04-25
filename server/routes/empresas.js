const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const empresasCtrl=require('../controllers/empresasCtrl');
const EMP_GetList='/api/empresas_get_list';
const EMP_Post='/api/empresas_post';
const EMP_Delete='/api/empresas_delete';
const EMP_Get='/api/empresas_get';
const EMP_Put='/api/empresas_put';

app.get(`${EMP_GetList}`,verifyToken,empresasCtrl.GetList);
app.get(`${EMP_Delete}/:id`,verifyToken,empresasCtrl.Delete);
app.get(`${EMP_Get}/:id`,verifyToken,empresasCtrl.Get);
app.post(`${EMP_Post}`,verifyToken,empresasCtrl.Post);
app.post(`${EMP_Put}`,verifyToken,empresasCtrl.Put);

module.exports=app;
