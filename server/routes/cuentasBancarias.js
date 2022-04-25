const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
const cuentasBancariasCtrl=require('../controllers/cuentasBancariasCtrl');
const CTABANC_GetList='/api/cuentasbancarias_get_list';
const CTABANC_Post='/api/cuentasbancarias_post';
const CTABANC_Delete='/api/cuentasbancarias_delete';
const CTABANC_Get='/api/cuentasbancarias_get';
const CTABANC_Put='/api/cuentasbancarias_put';

app.get(`${CTABANC_GetList}`,verifyToken,cuentasBancariasCtrl.GetList);
app.get(`${CTABANC_Delete}/:id`,verifyToken,cuentasBancariasCtrl.Delete);
app.get(`${CTABANC_Get}/:id`,verifyToken,cuentasBancariasCtrl.Get);
app.post(`${CTABANC_Post}`,verifyToken,cuentasBancariasCtrl.Post);
app.post(`${CTABANC_Put}`,verifyToken,cuentasBancariasCtrl.Put);

module.exports=app;
