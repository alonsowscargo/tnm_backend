const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const paisCtrl=require('../controllers/paisCtrl');
const PAIS_GetList='/api/pais_get_list';
const PAIS_Post='/api/pais_post';
const PAIS_Delete='/api/pais_delete';
const PAIS_Get='/api/pais_get';
const PAIS_Put='/api/pais_put';

app.get(`${PAIS_GetList}`,verifyToken,paisCtrl.GetList);
app.get(`${PAIS_Delete}/:id`,verifyToken,paisCtrl.Delete);
app.get(`${PAIS_Get}/:id`,verifyToken,paisCtrl.Get);
app.post(`${PAIS_Post}`,verifyToken,paisCtrl.Post);
app.post(`${PAIS_Put}`,verifyToken,paisCtrl.Put);

module.exports=app;
