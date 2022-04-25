const path =require('path');
//================================
//port
//================================
process.env.PORT = process.env.PORT || 3000;
//================================
//CADUCIDAD DEL TOKEN
//================================
process.env.EXPIRATION_TOKEN='24h';//60 * 60 * 24 * 30; // 30 dias.

//================================
process.env.userLoginCargoWs='rekkiem';

process.env.passwordLoginCargoWs='1234';

process.env.systemCargoWs='http://47.99.124.159:3001/api/';

process.env.HOSTFRONT = 'http://localhost:3008/'

//secret token
//================================
process.env.SECRET='QO2cvJmJdsIQ23SqU7ZYdgJGXamB9VIc9QCJV0wWeLw=';
process.env.ROOT_DIR=path.resolve(__dirname).replace("config","");

