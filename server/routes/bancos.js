const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const bancosCtrl=require('../controllers/bancosCtrl');
const BANC_GetList='/api/bancos_get_list';
const BANC_GetLista='/api/bancos';
const BANC_Post='/api/bancos_post';
const BANC_Delete='/api/bancos_delete';
const BANC_Get='/api/bancos_get';
const BANC_Put='/api/bancos_put';

app.get(`${BANC_GetList}`,verifyToken,bancosCtrl.GetList);
app.get(`${BANC_GetLista}`,verifyToken,bancosCtrl.GetList);
app.get(`${BANC_Delete}/:id`,verifyToken,bancosCtrl.Delete);
app.get(`${BANC_Get}/:id`,verifyToken,bancosCtrl.Get);
app.post(`${BANC_Post}`,verifyToken,bancosCtrl.Post);
app.post(`${BANC_Put}`,verifyToken,bancosCtrl.Put);

module.exports=app;
