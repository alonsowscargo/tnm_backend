const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const direccionesTiposCtrl=require('../controllers/tipoDireccionCtrl');
const DIRTIPO_GetList='/api/direccionestipos_get_list';
const DIRTIPO_GetLista='/api/tipoDireccion';
const DIRTIPO_Post='/api/direccionestipos_post';
const DIRTIPO_Delete='/api/direccionestipos_delete';
const DIRTIPO_Get='/api/direccionestipos_get';
const DIRTIPO_Put='/api/direccionestipos_put';

app.get(`${DIRTIPO_GetList}`,verifyToken,direccionesTiposCtrl.GetList);
app.get(`${DIRTIPO_GetLista}`,verifyToken,direccionesTiposCtrl.GetList);
app.get(`${DIRTIPO_Delete}/:id`,verifyToken,direccionesTiposCtrl.Delete);
app.get(`${DIRTIPO_Get}/:id`,verifyToken,direccionesTiposCtrl.Get);
app.post(`${DIRTIPO_Post}`,verifyToken,direccionesTiposCtrl.Post);
app.post(`${DIRTIPO_Put}`,verifyToken,direccionesTiposCtrl.Put);

module.exports=app;
