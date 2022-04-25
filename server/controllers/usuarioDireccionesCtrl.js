const client = require('../config/db.client');
exports.list = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "El id es obligatorio",
            success:false
            });
            return;
    }
    client.query('SELECT * FROM public.usuario_direcciones where usuario_id=$1', [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });   
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
      res.status(400).send({
        message: "El nombre es obligatorio",
        success:false
      });
      return;
    }else if (!req.body.direccion){
        res.status(400).send({
            message: "La dirección es obligatoria",
            success:false
          });
          return;
    }
    const query = {
        text: 'INSERT INTO public.usuario_direcciones(nombre,pais,region,comuna,direccion,numero,latitud,longitud,radio,usuario_id,direccion_tipo_id,observaciones) VALUES($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, $11,$12) RETURNING *',
        values: [req.body.nombre, req.body.pais,req.body.region,req.body.comuna,req.body.direccion,req.body.numero,req.body.latitud,req.body.longitud,req.body.radio,req.body.usuario_id,req.body.direccion_tipo_id,req.body.observaciones],
    };

    client.query(query,"",function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows[0]);
    });
};

exports.update = (req,res) =>{
    if (!req.params.id) {
        res.status(400).send({
            message: "El id es obligatorio",
            success:false
            });
            return;
    }
    const query = {
        text: 'UPDATE public.usuario_direcciones SET nombre=$1,pais=$2,region=$3,comuna=$4,direccion=$5,numero=$6,latitud=$7,longitud=$8,radio=$9,usuario_id=$10,direccion_tipo_id=$11,observaciones=$12 WHERE id=$13 RETURNING *',
        values: [req.body.nombre,req.body.pais,req.body.region,req.body.comuna,req.body.direccion,req.body.numero,req.body.latitud,req.body.longitud,req.body.radio,req.body.usuario_id,req.body.direccion_tipo_id,req.body.observaciones,req.params.id],
    };

    client.query(query,"",function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows[0]);
    });
};

exports.delete = (req,res) =>{
    if (!req.params.id) {
        res.status(400).send({
            message: "El id es obligatorio",
            success:false
            });
            return;
    }
    client.query('DELETE FROM public.usuario_direcciones where id = $1', [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send({
            message: "La dirección ha sido eliminada correctamente",
            success:true
            });
    });
};