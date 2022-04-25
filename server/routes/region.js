const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const regionCtrl=require('../controllers/regionCtrl');
const REG_GetList='/api/region_get_list';
const REG_Post='/api/region_post';
const REG_Delete='/api/region_delete';
const REG_Get='/api/region_get';
const REG_Put='/api/region_put';
const REG_GetRegionPais='/api/region_get_regionpais';

app.get(`${REG_GetList}`,verifyToken,regionCtrl.GetList);
app.get(`${REG_Delete}/:id`,verifyToken,regionCtrl.Delete);
app.get(`${REG_Get}/:id`,verifyToken,regionCtrl.Get);
app.post(`${REG_Post}`,verifyToken,regionCtrl.Post);
app.post(`${REG_Put}`,verifyToken,regionCtrl.Put);
app.get(`${REG_GetRegionPais}/:id`,verifyToken,regionCtrl.GetRegionPais);

module.exports=app;
