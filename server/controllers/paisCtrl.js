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
        FROM public.pais
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
        else if ( !req.body.codigo || req.body.codigo.trim()==0 ) {
            res.status(400).send({
            message: "EL CODIGO ES OBLIGATORIO",
            success:false }); res.end(); res.connection.destroy();
        }
        else {

            function LimpiarTexto (texto) { if(!texto) { return ''; } else { return texto.trim(); } }
            function LimpiarNumero (numero) { if(!numero) { return 0; } else { return parseInt(numero); } }
            function LimpiarFecha (fecha) { if(!fecha || fecha.length<10 ) { return null; } else { return fecha; } }
            function LimpiarFk (fk) { if(!fk || fk==0 || fk.length<10 ) { return null; } else { return fk; } }

            var nombre = LimpiarTexto(req.body.nombre);
            var codigo = LimpiarTexto(req.body.codigo);

            var ExisteNombre = await client.query(`SELECT * from public.pais where nombre='`+nombre+`' `);
            var ExisteCodigo = await client.query(`SELECT * from public.pais where codigo='`+codigo+`' `);

            if(ExisteNombre.rows.length>0) {
                res.status(400).send({
                message: "EL NOMBRE YA ESTA INGRESADO",
                success:false }); res.end(); res.connection.destroy();
            }
            else if(ExisteCodigo.rows.length>0) {
                res.status(400).send({
                message: "EL CODIGO YA ESTA INGRESADO",
                success:false }); res.end(); res.connection.destroy();
            }
            else {

                var columna = ''; var valor = '';
                columna+=`nombre,`; valor+=`'`+nombre+`',`;
                columna+=`codigo`; valor+=`'`+codigo+`'`;

                await client.query(` INSERT INTO public.pais (`+columna+`) VALUES (`+valor+`) `);
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
            await client.query(` DELETE FROM public.pais WHERE id=`+parseInt(req.params.id)+` `);
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
          var Lista = await client.query(` SELECT * FROM public.pais WHERE id=`+parseInt(req.params.id)+` `);
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
        if ( !req.body.id || req.body.id==0 ) {
            res.status(400).send({
            message: "NO SE DETECTO UN ID PARA ACTUALIZAR",
            success:false }); res.end(); res.connection.destroy();
        }
        else if ( !req.body.codigo || req.body.codigo==0 ) {
            res.status(400).send({
            message: "EL CODIGO ES OBLIGATORIO",
            success:false }); res.end(); res.connection.destroy();
        }
        else if ( !req.body.nombre || req.body.nombre.trim()==0 ) {
            res.status(400).send({
            message: "EL NOMBRE ES OBLIGATORIO",
            success:false }); res.end(); res.connection.destroy();
        }
        else {

            function LimpiarTexto (texto) { if(!texto) { return ''; } else { return texto.trim(); } }
            function LimpiarNumero (numero) { if(!numero) { return 0; } else { return parseInt(numero); } }
            function LimpiarFecha (fecha) { if(!fecha || fecha.length<10 ) { return null; } else { return fecha; } }
            function LimpiarFk (fk) { if(!fk || fk==0 || fk.length<10 ) { return null; } else { return fk; } }

            var id = req.body.id;
            var nombre = LimpiarTexto(req.body.nombre);
            var codigo = LimpiarTexto(req.body.codigo);

            var ExisteNombre = await client.query(`SELECT * from public.pais where id!=`+id+` and nombre='`+nombre+`' `);
            var ExisteCodigo = await client.query(`SELECT * from public.pais where id!=`+id+` and codigo='`+codigo+`' `);

            if(ExisteNombre.rows.length>0) {
                res.status(400).send({
                message: "EL NOMBRE YA ESTA INGRESADO",
                success:false }); res.end(); res.connection.destroy();
            }
            else if(ExisteCodigo.rows.length>0) {
                res.status(400).send({
                message: "EL CODIGO YA ESTA INGRESADO",
                success:false }); res.end(); res.connection.destroy();
            }
            else {

                var valores='';
                valores+=`nombre='`+nombre+`',`;
                valores+=`codigo='`+codigo+`'`;

                await client.query(` UPDATE public.pais SET `+valores+` where id=`+id);
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
