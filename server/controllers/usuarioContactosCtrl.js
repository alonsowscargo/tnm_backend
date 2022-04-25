const client = require('../config/db.client');
exports.list = (req, res) => {
    if (!req.params.usuario_id) {
        res.status(400).send({
            message: "El id es obligatorio",
            success:false
            });
            return;
    }
    client.query('SELECT * FROM public.usuario_contactos where usuario_id=$1', [req.params.usuario_id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });   
};

exports.create = (req, res) => {
    if (!req.body.nombre) {
      res.status(400).send({
        message: "El nombre es obligatorio",
        success:false
      });
      return;
    }else if (!req.body.apellidos){
        res.status(400).send({
            message: "El apellido es obligatorio",
            success:false
          });
          return;
    }else if (!req.body.usuario_id){
        res.status(400).send({
            message: "El usuario es obligatorio",
            success:false
          });
          return;
    }else if (!req.body.contacto_tipo_id){
        res.status(400).send({
            message: "El tipo de contacto es obligatorio",
            success:false
          });
          return;
    }
    const query = {
        text: 'INSERT INTO public.usuario_contactos(nombre,apellidos,telefono,telefono2,email,forma_cargo,comentario,contacto_tipo_id,usuario_id) VALUES($1, $2,$3, $4, $5, $6, $7, $8, $9) RETURNING *',
        values: [req.body.nombre, req.body.apellidos,req.body.telefono,req.body.telefono2,req.body.email,req.body.forma_cargo,req.body.comentario,req.body.contacto_tipo_id,req.body.usuario_id],
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
        text: 'UPDATE public.usuario_contactos SET nombre=$1,apellidos=$2,telefono=$3,telefono2=$4,email=$5,forma_cargo=$6,comentario=$7,contacto_tipo_id=$8,usuario_id=$9 WHERE id=$10 RETURNING *',
        values: [req.body.nombre,req.body.apellidos,req.body.telefono,req.body.telefono2,req.body.email,req.body.forma_cargo,req.body.comentario,req.body.contacto_tipo_id,req.body.usuario_id,req.params.id],
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
    client.query('DELETE FROM public.usuario_contactos where id = $1', [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send({
            message: "El contacto ha sido eliminado correctamente",
            success:true
            });
    });
};