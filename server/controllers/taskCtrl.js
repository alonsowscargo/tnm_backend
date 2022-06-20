const client = require('../config/db.client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const UserTask = require('../../models/prueba')


exports.create = async (req, res, next) => {
    // const{id,title, description}
    //console.log(req.body, req.params)

    // console.log(req.body)

    try {
        const query = {
            text: 'INSERT INTO public.task(title, description) VALUES($1, $2) RETURNING *',
            values: [req.body.title, req.body.description],
        };
    
        const hola = await client.query(query)
    
        res.json(hola.rows[0]);

    } catch (error) {
        next(error);
    }
};

exports.list = async (req, res, next) => {
    // const users = await UserTask.findAll()
    // res.status(200).send(users);
    try {
        //throw new Error('Algo fue mal')
        const allTasks = await client.query("SELECT * FROM public.task");
        res.json(allTasks.rows);
        
    } catch (error) {
        next(error);
    }
};

exports.findOneBy =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await client.query("SELECT * FROM public.task where id = $1", [id]);

        if(result.rows.length === 0){
            return res.status(404).json({
                message: 'tarea no encontrada'
            })
        }

        res.json(result.rows[0]);
        
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {

    try {
        const { id } = req.params;
        const result = await client.query("DELETE FROM public.task where id = $1", [id]);

        if(result.rowCount === 0){
            return res.status(404).json({
                message: 'tarea no encontrada'
            })
        }
        
        return res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
};
/************************************************************/
/************************************************************/

exports.update =  async (req, res, next) => {

    try {
        const { id } = req.params;
        const { title, description} = req.body;

        const result = await client.query(
            "UPDATE public.task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
            [title, description, id]
        )

        if( result.rows.length === 0 ){
            return res.status(404).json({
                message: 'tarea no encontrada'
            })
        }

        return res.json(result.rows[0])
        
    } catch (error) {
        next(error);
    }
};
