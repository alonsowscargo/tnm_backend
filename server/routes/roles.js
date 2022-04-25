const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const rolesCtrl=require('../controllers/rolesCtrl');
const CT_GetList='/api/roles_get_list';
const CT_Post='/api/roles_post';
const CT_Delete='/api/roles_delete';
const CT_Get='/api/roles_get';
const CT_Put='/api/roles_put';
const CT_GetLista='/api/roles';

app.get(`${CT_GetLista}`,verifyToken,rolesCtrl.GetList);
app.get(`${CT_GetList}`,verifyToken,rolesCtrl.GetList);
app.get(`${CT_Delete}/:id`,verifyToken,rolesCtrl.Delete);
app.get(`${CT_Get}/:id`,verifyToken,rolesCtrl.Get);
app.post(`${CT_Post}`,verifyToken,rolesCtrl.Post);
app.post(`${CT_Put}`,verifyToken,rolesCtrl.Put);
app.get(`${CT_GetList}`,verifyToken,rolesCtrl.GetList);

module.exports=app;
