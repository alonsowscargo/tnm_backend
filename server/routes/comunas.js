const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const comunaCtrl=require('../controllers/comunasCtrl');
const COM_GetList='/api/comuna_get_list';
const COM_GetComunaRegion='/api/comuna_get_comunaregion';
const COM_Post='/api/comuna_post';
const COM_Delete='/api/comuna_delete';
const COM_Get='/api/comuna_get';
const COM_Put='/api/comuna_put';

app.get(`${COM_GetList}`,verifyToken,comunaCtrl.GetList);
app.get(`${COM_Delete}/:id`,verifyToken,comunaCtrl.Delete);
app.get(`${COM_Get}/:id`,verifyToken,comunaCtrl.Get);
app.post(`${COM_Post}`,verifyToken,comunaCtrl.Post);
app.post(`${COM_Put}`,verifyToken,comunaCtrl.Put);
app.get(`${COM_GetComunaRegion}/:id`,verifyToken,comunaCtrl.GetComunaRegion);

module.exports=app;
