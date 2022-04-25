const client = require('../config/db.client');
const jwt=require('jsonwebtoken');

/************************************************************/
/************************************************************/
exports.GetList = async (req,res) =>{

    let token= req.get('Authorization'); jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });

    try {

        let Lista = await client.query(`
        SELECT
        *
        FROM public.direcciones_tipos
        order by id desc
        `);
        res.status(200).send(Lista.rows); res.end(); res.connection.destroy();

    } catch (error) {
        console.log("ERROR "+error);
        res.status(400).send({
            message: "ERROR AL CARGAR LISTADO",
            success:false,
        });
        res.end(); res.connection.destroy();

    }

};
/************************************************************/
/************************************************************/
exports.Post = async (req,res) =>{
    let token= req.get('Authorization'); jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });
    try {
        if ( !req.body.nombre || req.body.nombre.trim()==0 ) {
            res.status(400).send({
            message: "EL NOMBRE ES OBLIGATORIO",
            success:false }); res.end(); res.connection.destroy();
        }
        else {
            var nombre = req.body.nombre.trim();
            var Existe = await client.query(`SELECT * from public.direcciones_tipos where nombre='`+nombre+`' `);
            if(Existe.rows.length>0) {
                res.status(400).send({
                message: "EL NOMBRE YA ESTA INGRESADO",
                success:false }); res.end(); res.connection.destroy();
            }
            else {
                var columna = ''; var valor = '';
                columna=`nombre`; valor=`'`+nombre+`'`;
                await client.query(` INSERT INTO public.direcciones_tipos (`+columna+`) VALUES (`+valor+`) `);
                res.status(200).send([]); res.end(); res.connection.destroy();
            }
        }
    } catch (error) {
        console.log("ERROR "+error);
        res.status(400).send({
            message: "ERROR AL GUARDAR",
            success:false,
        });
        res.end(); res.connection.destroy();
    }
};
/************************************************************/
/************************************************************/
exports.Delete = async (req,res) =>{
    let token= req.get('Authorization'); jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });
    try {
        if ( !req.params.id || req.params.id==0 ) {
            res.status(400).send({
            message: "NO SE DETECTO UN ID A ELIMINAR",
            success:false }); res.end(); res.connection.destroy();
        }
        else {
            await client.query(` DELETE FROM public.direcciones_tipos WHERE id=`+parseInt(req.params.id)+` `);
            res.status(200).send([]); res.end(); res.connection.destroy();
        }
    } catch (error) {
        console.log("ERROR "+error);
        res.status(400).send({
            message: "NO SE PUEDE ELIMIAR, EL REGISTRO TIENE INFORMACIÓN RELACIONADA",
            success:false,
        });
        res.end(); res.connection.destroy();
    }
};
/************************************************************/
/************************************************************/
exports.Get = async (req,res) =>{
    let token= req.get('Authorization'); jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });
    try {
          var Lista = await client.query(` SELECT * FROM public.direcciones_tipos WHERE id=`+parseInt(req.params.id)+` `);
          res.status(200).send(Lista.rows); res.end(); res.connection.destroy();
    } catch (error) {
        console.log("ERROR "+error);
        res.status(400).send({
            message: "NO SE LOGRO CARGAR LA INFORMACIÓN",
            success:false,
        });
        res.end(); res.connection.destroy();
    }
};
/************************************************************/
/************************************************************/
exports.Put = async (req,res) =>{
    let token= req.get('Authorization'); jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });
    try {
        if ( !req.body.nombre || req.body.nombre.trim()==0 ) {
            res.status(400).send({
            message: "EL NOMBRE ES OBLIGATORIO",
            success:false }); res.end(); res.connection.destroy();
        }
        else if ( !req.body.id || req.body.id==0 ) {
            res.status(400).send({
            message: "NO SE DETECTO UN ID",
            success:false }); res.end(); res.connection.destroy();
        }
        else {
            var id = req.body.id;
            var nombre = req.body.nombre.trim();
            var Existe = await client.query(`SELECT * from public.direcciones_tipos where nombre='`+nombre+`' and id!=`+id+` `);
            if(Existe.rows.length>0) {
                res.status(400).send({
                message: "EL NOMBRE YA ESTA INGRESADO",
                success:false }); res.end(); res.connection.destroy();
            }
            else {
                var valores='';
                valores=`nombre='`+nombre+`'`;
                await client.query(` UPDATE public.direcciones_tipos SET `+valores+` where id=`+id);
                res.status(200).send([]); res.end(); res.connection.destroy();
            }
        }
    } catch (error) {
        console.log("ERROR "+error);
        res.status(400).send({
            message: "ERROR AL CARGAR LISTADO",
            success:false,
        });
        res.end(); res.connection.destroy();
    }
};
/************************************************************/
/************************************************************/
