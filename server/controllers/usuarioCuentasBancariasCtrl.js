const client = require('../config/db.client');
exports.list = (req, res) => {
    if (!req.params.usuario_id) {
        res.status(400).send({
            message: "El usuario_id es obligatorio",
            success:false
            });
            return;
    }
    client.query('SELECT * FROM public.usuario_cuentas_bancarias where usuario_id=$1', [req.params.usuario_id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });   
};

exports.create = (req, res) => {
    if (!req.body.banco_id) {
      res.status(400).send({
        message: "El banco es obligatorio",
        success:false
      });
      return;
    }else if (!req.body.tipo_cuenta_id){
        res.status(400).send({
            message: "El tipo de cuenta es obligatorio",
            success:false
          });
          return;
    }else if (!req.body.usuario_id){
        res.status(400).send({
            message: "El usuario es obligatorio",
            success:false
          });
          return;
    }else if (!req.body.cuenta){
        res.status(400).send({
            message: "La cuenta es obligatoria",
            success:false
          });
          return;
    }
    const query = {
        text: 'INSERT INTO public.usuario_cuentas_bancarias(banco_id,tipo_cuenta_id,cuenta,usuario_id) VALUES($1, $2,$3, $4) RETURNING *',
        values: [req.body.banco_id, req.body.tipo_cuenta_id,req.body.cuenta,req.body.usuario_id],
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
        text: 'UPDATE public.usuario_cuentas_bancarias SET banco_id=$1,tipo_cuenta_id=$2,cuenta=$3,usuario_id=$4 WHERE id=$5 RETURNING *',
        values: [req.body.banco_id, req.body.tipo_cuenta_id,req.body.cuenta,req.body.usuario_id,req.params.id],
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
    client.query('DELETE FROM public.usuario_cuentas_bancarias where id = $1', [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send({
            message: "La cuenta bancaria del usuario ha sido eliminada correctamente",
            success:true
            });
    });
};