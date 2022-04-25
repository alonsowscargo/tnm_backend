const nodemailer = require('nodemailer');
const juice = require('juice');
const htmltoText = require('html-to-text');
const util = require('util');
const pug = require('pug');
const path = require('path');
const { POINT_CONVERSION_HYBRID } = require('constants');

let transport_WSC = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: '587',
    auth: { user: 'wscargo@wscargo.cl', pass: 'Nuf39861'},
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
});


/**********************************************/
/**********************************************/
/**********************************************/

const view_mail_nuevo_usuario = (opciones) => {
    const html = pug.renderFile('./views/emails/view_mail_nuevo_usuario.pug', opciones);
    return juice(html);
}

exports.mail_nuevo_usuario = async(opciones) => {
    const html = view_mail_nuevo_usuario(opciones);
    const text = htmltoText.fromString(html);
    
    let opcionesEmail = {
        from: 'wscargo@wscargo.cl',
        /*to: opciones.email,*/
        to: 'eduardo.vidal@wscargo.cl',
        cc: 'eduardo.vidal@wscargo.cl',
        subject: opciones.asunto,
        text,
        html
    };

    var estado = await transport_WSC.sendMail(opcionesEmail).then(function(info){
        console.log(" ENVIO CORREO NUEVO USUARIO OK ");
        return true;
    }).catch(function(err){
        console.log(" ENVIO CORREO NUEVO USUARIO ERROR "+err);
        return false;
    });
    return estado;
}

/**********************************************/
/**********************************************/
/**********************************************/

const view_mail_notificacion_tarifa = (opciones) => {
    const html = pug.renderFile('./views/emails/view_mail_notificacion_tarifa.pug', opciones);
    return juice(html);
}

exports.mail_notificacion_tarifa = async(opciones) => {
    const html = view_mail_notificacion_tarifa(opciones);
    const text = htmltoText.fromString(html);
    
    let opcionesEmail = {
        from: 'wscargo@wscargo.cl',
        /*to: opciones.email,*/
        to: 'eduardo.vidal@wscargo.cl',
        cc: 'eduardo.vidal@wscargo.cl',
        subject: opciones.asunto,
        text,
        html
    };

    var estado = await transport_WSC.sendMail(opcionesEmail).then(function(info){
        console.log(" ENVIO CORREO NUEVA TARIFA OK ");
        return true;
    }).catch(function(err){
        console.log(" ENVIO CORREO NUEVA TARIFA ERROR "+err);
        return false;
    });
    return estado;
}

/**********************************************/
/**********************************************/
/**********************************************/

const view_mail_notificacion_planificacion_confirmada = (opciones) => {
    const html = pug.renderFile('./views/emails/view_mail_notificacion_planificacion_confirmada.pug', opciones);
    return juice(html);
}

exports.mail_notificacion_planificacion_confirmada = async(opciones) => {
    const html = view_mail_notificacion_planificacion_confirmada(opciones);
    const text = htmltoText.fromString(html);
    
    let opcionesEmail = {
        from: 'wscargo@wscargo.cl',
        to: opciones.email,
        //cc: 'pbarria.reyes@gmail.com',
        subject: opciones.asunto,
        text,
        html,
        /*attachments: [
        {
            filename: 'file-name.pdf', // <= Here: made sure file name match
            path: path.join(__dirname, '../server/controllers/etiquetas/Propuesta_Comercial_ejemplo.pdf'), // <= Here
            contentType: 'application/pdf'
        }
    ]*/
    };

    var estado = await transport_WSC.sendMail(opcionesEmail).then(function(info){
        console.log(" ENVIO CORREO CONFIRMACION PLANFICACION OK ");
        return true;
    }).catch(function(err){
        console.log(" ENVIO CORREO CONFIRMACION PLANFICACION ERROR "+err);
        return false;
    });
    return estado;
}

const view_notificacion_etiqueta_cliente = (opciones) => {
    const html = pug.renderFile('./views/emails/view_mail_notificacion_etiqueta_cliente.pug', opciones);
    return juice(html);
}

exports.mail_notificacion_etiqueta_cliente = async(opciones) => {
    const html = view_notificacion_etiqueta_cliente(opciones);
    const text = htmltoText.fromString(html);
    
    let opcionesEmail = {
        from: 'wscargo@wscargo.cl',
        to: opciones.email,
        //cc: 'pbarria.reyes@gmail.com',
        subject: opciones.asunto,
        text,
        html,
        attachments: [
        {
            filename: 'etiqueta-wsc-'+opciones.fk_cliente+'.pdf', // <= Here: made sure file name match
            path: path.join(__dirname, '../server/controllers/etiquetas/'+opciones.fk_cliente+'.pdf'), // <= Here
            contentType: 'application/pdf'
        }
    ]
    };

    var estado = await transport_WSC.sendMail(opcionesEmail).then(function(info){
        console.log(" ENVIO CORREO ETIQUETA CLIENTE OK ");
        return true;
    }).catch(function(err){
        console.log(" ENVIO CORREO ETIQUETA CLIENTE ERROR "+err);
        return false;
    });
    return estado;
}

/*
*   
*
*/
const view_mail_notificacion_proceso_documental = (opciones) => {
    const html = pug.renderFile('./views/emails/view_mail_notificacion_proceso_documental.pug', opciones);
    return juice(html);
}

exports.mail_notificacion_proceso_documental = async(opciones) => {
    const html = view_mail_notificacion_proceso_documental(opciones);
    const text = htmltoText.fromString(html);
    
    let opcionesEmail = {
        from: 'wscargo@wscargo.cl',
        to: opciones.to,
        cc: opciones.cc,
        subject: opciones.asunto,
        text,
        html,
        attachments: opciones.attachment 
        
        /*[
            {
                filename: opciones.attachment[0].filename, // <= Here: made sure file name match
                path: opciones.attachment[0].path, // <= Here
                contentType: opciones.attachment[0].contentType
            },
            {
                filename: opciones.attachment[1].filename, // <= Here: made sure file name match
                path: opciones.attachment[1].path, // <= Here
                contentType: opciones.attachment[1].contentType
            }
        ]*/
    };

    var estado = await transport_WSC.sendMail(opcionesEmail).then(function(info){
        console.log(" ENVIO CORREO NOTIFICACION PROCESO DOCUMENTAL OK ");
        return true;
    }).catch(function(err){
        console.log(" ENVIO CORREO NOTIFICACION PROCESO DOCUMENTAL ERROR "+err);
        return false;
    });
    return estado;
}