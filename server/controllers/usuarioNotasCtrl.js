const client = require('../config/db.client');
exports.list = (req, res) => {
    if (!req.params.usuario_id) {
        res.status(400).send({
            message: "El usuario_id es obligatorio",
            success:false
            });
            return;
    }

    client.query('SELECT * FROM public.usuario_notas where usuario_id=$1', [req.params.usuario_id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });   
};

exports.create = (req, res) => {
    if (!req.body.usuario_id){
        res.status(400).send({
            message: "El usuario es obligatorio",
            success:false
          });
          return;
    }else if (!req.body.nota){
        res.status(400).send({
            message: "La nota es obligatoria",
            success:false
          });
          return;
    }
    const query = {
        text: 'INSERT INTO public.usuario_notas(usuario_id,nota) VALUES($1, $2) RETURNING *',
        values: [req.body.usuario_id,req.body.nota],
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
    }else if(!req.body.nota){
        res.status(400).send({
            message: "La nota es obligatoria",
            success:false
            });
            return;
    }
    const query = {
        text: 'UPDATE public.usuario_notas SET nota=$1 WHERE id=$2 RETURNING *',
        values: [req.body.nota,req.params.id],
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
    client.query('DELETE FROM public.usuario_notas where id = $1', [req.params.id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send({
            message: "La nota del usuario ha sido eliminada correctamente",
            success:true
            });
    });
};