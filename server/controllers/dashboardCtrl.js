const client = require('../config/db.client');
const jwt=require('jsonwebtoken');
const moment=require('moment');

exports.getClientsPendingsRepLegalDoc = async (req, res) => {
    try {

    	let token= req.get('Authorization');
        jwt.verify(token, process.env.SECRET, (err,decoded)=>{
	        if(err){
	            return res.status(401).json({
	                success:false,
	                err
	            })
	        }
	        req.usuario = decoded.usuario;
        });

        let query=`SELECT 
        			(row_number() over ())::int as row_id
				    , c.id
				    , c.rut
				    , c.codigo
        			, c."razonSocial" as razonsocial
    				, c."dteEmail" as dteemail
    				, c.telefono1
    				, coalesce(SUBSTRING(c."fechaCreacion",0,11),'') as creacion
    				, UPPER(concat ( case when TRIM(comer.nombre) LIKE '% %' then left(TRIM(comer.nombre), strpos(TRIM(comer.nombre), ' ') - 1) else TRIM(comer.nombre) end ,' '
    				, case when TRIM(comer.apellidos) LIKE '% %' then left(TRIM(comer.apellidos), strpos(TRIM(comer.apellidos), ' ') - 1) else TRIM(comer.apellidos) end )) as comercial
        			,1 AS TC
                    FROM clientes c 
        			left join usuario comer on comer.id=c.fk_comercial 
        			where c.id NOT IN (SELECT cc.fk_cliente FROM clientes_contactos cc where cc.fk_tipo=4 and cc.estado=true) 
                    UNION
                    SELECT 
                    (row_number() over ())::int as row_id
                    , c.id
                    , c.rut
                    , c.codigo
                    , c."razonSocial" as razonsocial
                    , c."dteEmail" as dteemail
                    , c.telefono1
                    , coalesce(SUBSTRING(c."fechaCreacion",0,11),'') as creacion
                    , UPPER(concat ( case when TRIM(comer.nombre) LIKE '% %' then left(TRIM(comer.nombre), strpos(TRIM(comer.nombre), ' ') - 1) else TRIM(comer.nombre) end ,' '
                    , case when TRIM(comer.apellidos) LIKE '% %' then left(TRIM(comer.apellidos), strpos(TRIM(comer.apellidos), ' ') - 1) else TRIM(comer.apellidos) end )) as comercial
                    ,2 AS TC
                    FROM clientes c 
                    left join usuario comer on comer.id=c.fk_comercial 
                    inner join public.tracking t on t.fk_cliente=c.id
                    where 
                    c.id in (SELECT cc.fk_cliente FROM clientes_contactos cc inner join clientes c on c.id=cc.fk_cliente left join clientes_contactos_archivos cca on cca.fk_contacto=cc.id where c.fk_comercial=7 and cc.fk_tipo=4 and cc.estado=true and cca.cedula_1 is null and cca.cedula_2 is null and (cca.podersimple_1 is null or cca.podersimple_2 is null))
        			ORDER BY TC,id ASC
                    `;

        if(req.usuario.fk_rol==2){//perfil comercial
        	query=`SELECT 
                    (row_number() over ())::int as row_id
                    , c.id
                    , c.rut
                    , c.codigo
                    , c."razonSocial" as razonsocial
                    , c."dteEmail" as dteemail
                    , c.telefono1
                    , coalesce(SUBSTRING(c."fechaCreacion",0,11),'') as creacion
                    , UPPER(concat ( case when TRIM(comer.nombre) LIKE '% %' then left(TRIM(comer.nombre), strpos(TRIM(comer.nombre), ' ') - 1) else TRIM(comer.nombre) end ,' '
                    , case when TRIM(comer.apellidos) LIKE '% %' then left(TRIM(comer.apellidos), strpos(TRIM(comer.apellidos), ' ') - 1) else TRIM(comer.apellidos) end )) as comercial
                    ,1 AS TC
                    FROM clientes c 
                    left join usuario comer on comer.id=c.fk_comercial 
                    where c.fk_comercial=`+parseInt(req.usuario.id)+` and c.id NOT IN (SELECT cc.fk_cliente FROM clientes_contactos cc where cc.fk_tipo=4 and cc.estado=true)
                    UNION
                    SELECT 
                    (row_number() over ())::int as row_id
                    , c.id
                    , c.rut
                    , c.codigo
                    , c."razonSocial" as razonsocial
                    , c."dteEmail" as dteemail
                    , c.telefono1
                    , coalesce(SUBSTRING(c."fechaCreacion",0,11),'') as creacion
                    , UPPER(concat ( case when TRIM(comer.nombre) LIKE '% %' then left(TRIM(comer.nombre), strpos(TRIM(comer.nombre), ' ') - 1) else TRIM(comer.nombre) end ,' '
                    , case when TRIM(comer.apellidos) LIKE '% %' then left(TRIM(comer.apellidos), strpos(TRIM(comer.apellidos), ' ') - 1) else TRIM(comer.apellidos) end )) as comercial
                    ,2 AS TC
                    FROM clientes c 
                    left join usuario comer on comer.id=c.fk_comercial 
                    inner join public.tracking t on t.fk_cliente=c.id
                    where c.fk_comercial=`+parseInt(req.usuario.id)+` AND
                    c.id in (SELECT cc.fk_cliente FROM clientes_contactos cc inner join clientes c on c.id=cc.fk_cliente left join clientes_contactos_archivos cca on cca.fk_contacto=cc.id where c.fk_comercial=7 and cc.fk_tipo=4 and cc.estado=true and cca.cedula_1 is null and cca.cedula_2 is null and (cca.podersimple_1 is null or cca.podersimple_2 is null))
                    ORDER BY TC,id ASC
                    `;                    
        } 

        if(req.usuario.fk_rol==1 || req.usuario.fk_rol==2){
            const result=await client.query(query);

            if(result && result.rows){
                res.status(200).send(result.rows);
                res.end(); res.connection.destroy();
            }else{
                res.status(200).send([]);
                res.end(); res.connection.destroy();
            }
        }else{
            res.status(200).send([]);
            res.end(); res.connection.destroy();
        }
        
    } catch (error) {
        console.log('ERROR getClientsPendingsRepLegalDoc'+error);
        res.status(400).send({
        message: "Problemas al obtener el listado clientes con representante legal y documentación pendiente",
        success:false,}); res.end(); res.connection.destroy();
    }
};

function daysInMonth(month,year) {
    var count =  moment().year(year).month(month).daysInMonth();
    var days = [];
    for (var i = 1; i < count+1; i++) {
        days.push(moment().year(year).month(month).date(i).format('YYYYMMDD'));
    }
    return days;
}
exports.getReportPropuestasComerciales = async (req, res) => {
    try {

        if (!req.params.fecha) {
        res.status(400).send({
            message: "La fecha es obligatoria",
            success:false
            });
        }

        let fec=moment(req.params.fecha).format('YYYYMM');
        let year=fec.substring(0,4);
        let days=daysInMonth( moment(fec).month(),year );

        let reporteFinal=[];

        for(let i=0;i<days.length;i++){
            let fecha1=moment(days[i]).format('YYYY-MM-DD')+' 00:00:00';
            let fecha2=moment(days[i]).format('YYYY-MM-DD')+' 23:59:59';

            var Reporte = await client.query(`
             SELECT  
                concat(u.nombre,' ',u.apellidos) as comercial
                ,coalesce((SELECT COUNT(p.id) from public.gc_propuestas_cabeceras p where p.fk_responsable=u.id and p."fechaCreacion" between '${fecha1}' and '${fecha2}'),0) as propuestas
                from
                public.usuario u 
                where u.fk_rol=2 
            `);
            if(Reporte && Reporte.rows){
                let obj={fecha:moment(days[i]).format('DD-MM')};
                if(Reporte.rows && Reporte.rows.length){
                    Reporte.rows.map(function(item,index){
                        obj['comercial'+(index+1)]=item.comercial;
                        obj['propuestas'+(index+1)]=item.propuestas;

                    });
                     obj['count']=Reporte.rows.length;
                }
                reporteFinal.push(obj);
            }
        }
                  
            res.status(200).send(reporteFinal);
            res.end(); res.connection.destroy();
         
        } catch (error) {
        console.log('ERROR getReportPropuestasComerciales'+error);
        res.status(400).send({
        message: "Problemas al obtener el reporte getReportPropuestasComerciales",
        success:false,}); res.end(); res.connection.destroy();
    }
};

exports.getReportClientesCreados = async (req, res) => {
    try {

        if (!req.params.fecha) {
        res.status(400).send({
            message: "La fecha es obligatoria",
            success:false
            });
        }

        let fec=moment(req.params.fecha).format('YYYYMM');
        let year=fec.substring(0,4);
        let days=daysInMonth( moment(fec).month(),year);
        let reporteFinal=[];

        for(let i=0;i<days.length;i++){
            let fecha1=moment(days[i]).format('YYYY-MM-DD')+' 00:00:00';
            let fecha2=moment(days[i]).format('YYYY-MM-DD')+' 23:59:59';

            var Reporte = await client.query(`
             SELECT  
                concat(u.nombre,' ',u.apellidos) as comercial,
                coalesce((SELECT COUNT(c.id) from public.clientes c where c.fk_responsable=u.id and c."fechaCreacion" between '${fecha1}' and '${fecha2}'),0) as clientes
                from
                public.usuario u 
                where u.fk_rol=2 
            `);

            if(Reporte && Reporte.rows){
                let obj={fecha:moment(days[i]).format('DD-MM')};
                if(Reporte.rows && Reporte.rows.length){
                    Reporte.rows.map(function(item,index){
                        obj['comercial'+(index+1)]=item.comercial;
                        obj['clientes'+(index+1)]=item.clientes;

                    });
                     obj['count']=Reporte.rows.length;
                }
                reporteFinal.push(obj);
            }

        }
         
        res.status(200).send(reporteFinal);
        res.end(); res.connection.destroy();
         
        } catch (error) {
        console.log('ERROR getReportClientesCreados'+error);
        res.status(400).send({
        message: "Problemas al obtener el reporte getReportClientesCreados",
        success:false,}); res.end(); res.connection.destroy();
    }
};

exports.getReportTrackingsCreados = async (req, res) => {
    try {

        if (!req.params.fecha) {
        res.status(400).send({
            message: "La fecha es obligatoria",
            success:false
            });
        }

         let fec=moment(req.params.fecha).format('YYYYMM');
         let year=fec.substring(0,4);
        let days=daysInMonth( moment(fec).month(),year );
         let reporteFinal=[];

        for(let i=0;i<days.length;i++){
            let fecha1=moment(days[i]).format('YYYY-MM-DD')+' 00:00:00';
            let fecha2=moment(days[i]).format('YYYY-MM-DD')+' 23:59:59';
            var Reporte = await client.query(`
             SELECT  
                    concat(u.nombre,' ',u.apellidos) as comercial
                    ,coalesce((SELECT COUNT(t.id) from public.tracking t inner join public.clientes c on c.id=t.fk_cliente where c.fk_comercial=u.id and t.fecha_creacion between '${fecha1}' and '${fecha2}'),0) as recepciones
                    from
                    public.usuario u 
                    where u.fk_rol=2  
            `);

             var Reporte2 = await client.query(`
             SELECT 
                    'SIN CLIENTE' as comercial
                    ,coalesce((SELECT COUNT(id)),0) as recepciones
                    FROM public.tracking WHERE fk_cliente is null and fecha_creacion between '${fecha1}' and '${fecha2}'
            `);
            if(Reporte && Reporte.rows){
                let obj={fecha:moment(days[i]).format('DD-MM')};
                let idx=0;
                if(Reporte.rows && Reporte.rows.length){
                    Reporte.rows.map(function(item,index){
                        idx=index+1;
                        obj['comercial'+idx]=item.comercial;
                        obj['recepciones'+idx]=item.recepciones;
                    });

                    if(Reporte2.rows && Reporte2.rows.length){
                        idx++;
                        obj['comercial'+idx]=Reporte2.rows[0].comercial;
                        obj['recepciones'+idx]=Reporte2.rows[0].recepciones;
                    }
                    obj.count=idx;
                }

                reporteFinal.push(obj);
            }

        }
         
        res.status(200).send(reporteFinal);
        res.end(); res.connection.destroy();
         
        } catch (error) {
        console.log('ERROR getReportClientesCreados'+error);
        res.status(400).send({
        message: "Problemas al obtener el reporte getReportClientesCreados",
        success:false,}); res.end(); res.connection.destroy();
    }
};



