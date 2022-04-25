const client = require('../config/db.client');
const jwt=require('jsonwebtoken');

/************************************************************/
/************************************************************/
exports.GetList = async (req,res) =>{

    let token= req.get('Authorization'); jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });

    try {

        let Lista = await client.query(`
        SELECT
        id
        , estado
        , patente
        , anio
        , motor
        , chasis
        , asientos
        , case when "fechaRevision" is null then '' else TO_CHAR("fechaRevision", 'YYYY-MM-DD') end  as fechaRevision
        , case when "fechaPermiso" is null then '' else TO_CHAR("fechaPermiso", 'YYYY-MM-DD') end as fechaPermiso
        , fk_responsable
        , "fechaCreacion"
        , "fechaActualizacion"
        , coalesce(fk_marca,0) as fk_marca
        , coalesce(fk_modelo,0) as fk_modelo
        , coalesce(fk_tipo,0) as fk_tipo
        FROM public.equipos
        WHERE estado is true
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

    var moment = require('moment');
    let fecha = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    var token= req.get('Authorization');
    jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });

    try {

        if ( !req.body.patente || req.body.patente.trim()==0 ) {
            res.status(400).send({
            message: "LA PATENTE ES OBLIGATORIA",
            success:false }); res.end(); res.connection.destroy();
        }
        else {

            function LimpiarTexto (texto) { if(!texto) { return ''; } else { return texto.trim(); } }
            function LimpiarNumero (numero) { if(!numero) { return 0; } else { return parseInt(numero); } }
            function LimpiarFecha (fecha) { if(!fecha || fecha.length<10 ) { return null; } else { return fecha; } }
            function LimpiarFk (fk) { if(!fk || fk==0 || fk.length<10 ) { return null; } else { return fk; } }

            var patente = LimpiarTexto(req.body.patente);
            var estado = true;
            var anio = LimpiarNumero(req.body.anio);
            var motor = LimpiarTexto(req.body.motor);
            var chasis = LimpiarTexto(req.body.chasis);
            var asientos = LimpiarNumero(req.body.asientos);
            var fechaRevision = LimpiarFecha(req.body.fechaRevision);
            var fechaPermiso = LimpiarFecha(req.body.fechaPermiso);
            var fk_responsable = req.usuario.id;
            var fechaCreacion = fecha;
            var fechaActualizacion = fecha;
            var fk_marca = LimpiarFk(req.body.fk_marca);
            var fk_tipo = LimpiarFk(req.body.fk_tipo);
            var fk_modelo = LimpiarFk(req.body.fk_modelo);

            var Existe = await client.query(`SELECT * from public.equipos where patente='`+patente+`' `);
            if(Existe.rows.length>0) {
                res.status(400).send({
                message: "LA PATENTE YA ESTA INGRESADA",
                success:false }); res.end(); res.connection.destroy();
            }
            else {

                var columna = ''; var valor = '';
                columna+=`patente,`; valor+=`'`+patente+`',`;
                columna+=`estado,`; valor+=``+estado+`,`;
                columna+=`anio,`; valor+=``+anio+`,`;
                columna+=`motor,`; valor+=`'`+motor+`',`;
                columna+=`chasis,`; valor+=`'`+chasis+`',`;
                columna+=`asientos,`; valor+=``+asientos+`,`;

                if(fechaRevision!=null) { columna+=`"fechaRevision",`; valor+=`'`+fechaRevision+`',`; }
                else { columna+=`"fechaRevision",`; valor+=`null,`; }

                if(fechaPermiso!=null) { columna+=`"fechaPermiso",`; valor+=`'`+fechaPermiso+`',`; }
                else { columna+=`"fechaPermiso",`; valor+=`null,`; }

                columna+=`fk_responsable,`; valor+=``+fk_responsable+`,`;
                columna+=`"fechaCreacion",`; valor+=`'`+fechaCreacion+`',`;
                columna+=`"fechaActualizacion",`; valor+=`'`+fechaActualizacion+`',`;
                columna+=`fk_marca,`; valor+=``+fk_marca+`,`;
                columna+=`fk_tipo,`; valor+=``+fk_tipo+`,`;
                columna+=`fk_modelo`; valor+=``+fk_modelo+``;

                console.log(` INSERT INTO public.equipos (`+columna+`) VALUES (`+valor+`) `);
                await client.query(` INSERT INTO public.equipos (`+columna+`) VALUES (`+valor+`) `);
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
            await client.query(` UPDATE public.equipos SET estado=false WHERE id=`+parseInt(req.params.id)+` `);
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
          var Lista = await client.query(`
          SELECT
          id
          , estado
          , patente
          , anio
          , motor
          , chasis
          , asientos
          , case when "fechaRevision" is null then '' else TO_CHAR("fechaRevision", 'YYYY-MM-DD') end  as fechaRevision
          , case when "fechaPermiso" is null then '' else TO_CHAR("fechaPermiso", 'YYYY-MM-DD') end as fechaPermiso
          , fk_responsable
          , "fechaCreacion"
          , "fechaActualizacion"
          , coalesce(fk_marca,0) as fk_marca
          , coalesce(fk_modelo,0) as fk_modelo
          , coalesce(fk_tipo,0) as fk_tipo
          FROM public.equipos WHERE id=`+parseInt(req.params.id)+` `);
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

      var moment = require('moment');
      let fecha = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      var token= req.get('Authorization');
      jwt.verify(token, process.env.SECRET, (err,decoded)=>{ if(err){ return res.status(401).json({ success:false, err }) } req.usuario = decoded.usuario; });

      try
      {
          if ( !req.body.patente || req.body.patente.trim()==0 )
          {
              res.status(400).send({
              message: "LA PATENTE ES OBLIGATORIA",
              success:false }); res.end(); res.connection.destroy();
          }
          else
          {

              function LimpiarTexto (texto) { if(!texto) { return ''; } else { return texto.trim(); } }
              function LimpiarNumero (numero) { if(!numero) { return 0; } else { return parseInt(numero); } }
              function LimpiarFecha (fecha) { if(!fecha || fecha.length<10 ) { return null; } else { return fecha; } }
              function LimpiarFk (fk) { if(!fk || fk==0 || fk.length<10 ) { return null; } else { return fk; } }

              var id = req.body.id;
              var patente = LimpiarTexto(req.body.patente);
              var estado = true;
              var anio = LimpiarNumero(req.body.anio);
              var motor = LimpiarTexto(req.body.motor);
              var chasis = LimpiarTexto(req.body.chasis);
              var asientos = LimpiarNumero(req.body.asientos);
              var fechaRevision = LimpiarFecha(req.body.fechaRevision);
              var fechaPermiso = LimpiarFecha(req.body.fechaPermiso);
              var fk_responsable = req.usuario.id;
              var fechaCreacion = fecha;
              var fechaActualizacion = fecha;
              var fk_marca = LimpiarFk(req.body.fk_marca);
              var fk_tipo = LimpiarFk(req.body.fk_tipo);
              var fk_modelo = LimpiarFk(req.body.fk_modelo);

              var Existe = await client.query(` SELECT * from public.equipos where patente='`+patente+`' and id!=`+id );

              if(Existe.rows.length>0)
              {
                  res.status(400).send({
                  message: "LA PATENTE YA ESTA INGRESADA",
                  success:false }); res.end(); res.connection.destroy();
              }
              else
              {
                  var valor = '';
                  valor+=`patente='`+patente+`',`;
                  valor+=`anio=`+anio+`,`;
                  valor+=`motor='`+motor+`',`;
                  valor+=`chasis='`+chasis+`',`;
                  valor+=`asientos=`+asientos+`,`;

                  if(fechaRevision!=null) { valor+=`"fechaRevision"='`+fechaRevision+`',`; }
                  else { valor+=`"fechaRevision"=null,`; }

                  if(fechaPermiso!=null) { valor+=`"fechaPermiso"='`+fechaPermiso+`',`; }
                  else { valor+=`"fechaPermiso"=null,`; }

                  valor+=`fk_responsable=`+fk_responsable+`,`;
                  valor+=`"fechaActualizacion"='`+fechaActualizacion+`',`;
                  valor+=`fk_marca=`+fk_marca+`,`;
                  valor+=`fk_tipo=`+fk_tipo+`,`;
                  valor+=`fk_modelo=`+fk_modelo+``;

                  await client.query(` UPDATE public.equipos SET `+valor+` WHERE id=`+id );
                  res.status(200).send([]); res.end(); res.connection.destroy();
              }
          }
      }
      catch (error)
      {
          console.log("ERROR "+error);
          res.status(400).send({
          message: "ERROR AL GUARDAR",
          success:false, }); res.end(); res.connection.destroy();
      }
  };
  /************************************************************/
  /************************************************************/
