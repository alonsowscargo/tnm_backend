const client = require('../config/db.client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const UserTask = require('../../models/prueba')

`
select
        case when eta.eta_fecha='' or eta.eta_fecha='0' or eta.eta_fecha is null or eta.eta_fecha='01-01-1990' then ''
        else eta.eta_fecha end as eta_fecha
        , case when ser.dias_libres_nav<=0 or ser.dias_libres_nav is null then 0 else ser.dias_libres_nav end as dias_libres_nav
        , coalesce(ser.fechalimite,'') as fechalimite

        , ser.id
        , coalesce(ser.prioritario,0) as prioritario
        , ser.estado
        , ser.referencia
        , ser.total_referencias
        , concat ( case when TRIM(comer.usu_nombre) LIKE '% %' then left(TRIM(comer.usu_nombre), strpos(TRIM(comer.usu_nombre), ' ') - 1) else TRIM(comer.usu_nombre) end ,' '
        , case when TRIM(comer.usu_apellido) LIKE '% %' then left(TRIM(comer.usu_apellido), strpos(TRIM(comer.usu_apellido), ' ') - 1) else TRIM(comer.usu_apellido) end ) as comercial_nombre
        , cli_fact.cli_nombre as cli_fact_nombre
        , cli_desp.cli_nombre as cli_desp_nombre
        , ser.retiro_puerto_chk_guia
        , ser.retiro_puerto_chk_tarjeton
        , ser.retiro_puerto_chk_dress
        , ser.retiro_puerto_chk_tact
        , ser.fk_tipo_servicio as servicio_codigo
        , coalesce(nave.nave_nombre,'') as servicio_nave_nombre
        , ser.numero_reserva
        , ser.numero_sello
        , ser.fk_tipo_carga
        , ser.numero_contenedor
        , coalesce(cont_tip.cont_nombre,'') as cont_tipo_nombre
        , coalesce(cont_tam.conttam_tamano,'') as cont_tamano
        , ser.contenedor_peso
        , ser.contenedor_peso_carga
        , ser.retiro_puerto_chk_guia
        , ser.retiro_puerto_chk_tarjeton
        , ser.retiro_puerto_chk_tact
        , ser.retiro_puerto_chk_dress
        , ser.retiro_puerto_numero_tarjeton
        , ser.retiro_puerto_numero_guia

        , coalesce(eta_1.fecha, '') as etapa_1_fecha
        , coalesce(eta_1.hora, '') as etapa_1_hora
        , coalesce(dir_1.nombre,'') as etapa_1_lugar_nombre
        , concat(dir_1.nombre) as etapa_1_direccion_texto
        , concat(cond_1.usu_rut) as etapa_1_conductor_rut
        , concat ( TRIM(coalesce(cond_1.usu_nombre,'')),' ',TRIM(coalesce(cond_1.usu_apellido,'')) ) as etapa_1_conductor_nombre
        , coalesce(tract_1.patente,'') as etapa_1_tracto

        , coalesce(eta_2.fecha, '') as etapa_2_fecha
        , coalesce(eta_2.hora, '') as etapa_2_hora
        , coalesce(dir_2.nombre,'') as etapa_2_lugar_nombre
        , concat(cond_2.usu_rut) as etapa_2_conductor_rut
        , concat(dir_2.direccion,' ',dir_2.numero,', ',com_2.comuna_nombre) as etapa_2_direccion_texto
        , concat ( TRIM(coalesce(cond_2.usu_nombre,'')),' ',TRIM(coalesce(cond_2.usu_apellido,'')) ) as etapa_2_conductor_nombre
        , coalesce(tract_2.patente,'') as etapa_2_tracto

        , coalesce(eta_3.fecha, '') as etapa_3_fecha
        , coalesce(eta_3.hora, '') as etapa_3_hora
        , coalesce(dir_3.nombre,'') as etapa_3_lugar_nombre
        , concat(dir_3.nombre) as etapa_3_direccion_texto
        , concat(cond_3.usu_rut) as etapa_3_conductor_rut
        , concat ( TRIM(coalesce(cond_3.usu_nombre,'')),' ',TRIM(coalesce(cond_3.usu_apellido,'')) ) as etapa_3_conductor_nombre
        , coalesce(tract_3.patente,'') as etapa_3_tracto

        , coalesce(ser.almacenaje_principal,'') as almacenaje_principal
        , concat( coalesce(ser.cont_fila,''),'-',coalesce(ser.cont_columna,''),'-',coalesce(ser.cont_posicion) ) as posicion_ubicacion
        , case
        when ser.cont_tipo_mov='SALIDA' and ser.cont_tipo='VACIO' THEN concat('S-V ',coalesce(ser.cont_hora,''))
        when ser.cont_tipo_mov='SALIDA' and ser.cont_tipo='LLENO' THEN concat('S-F ',coalesce(ser.cont_hora,''))
        when ser.cont_tipo_mov='INGRESO' and ser.cont_tipo='VACIO' THEN 'A-V'
        when ser.cont_tipo_mov='INGRESO' and ser.cont_tipo='LLENO' THEN 'A-F'
        when ser.cont_tipo_mov='CAMBIO POSICION' and ser.cont_tipo='VACIO' THEN 'A-V'
        when ser.cont_tipo_mov='CAMBIO POSICION' and ser.cont_tipo='LLENO' THEN 'A-F'
        else '' end as posicion_tipo
        , coalesce(ser.cant_guia,0) as guias
        , coalesce(ser.cant_eirl,0) as eirls
        , (SELECT count(temp1.id) FROM public.servicios_dias_libres as temp1 where temp1.fk_servicio=ser.id) as CantDiasLibres

        from
        public.servicios as ser
        INNER JOIN public.clientes as cli on ser.fk_cliente_facturacion=cli.cli_codigo
        INNER JOIN public.clientes_usuarios as cli_usu on cli.cli_codigo=cli_usu.fk_cli and cli_usu.fk_usu='7.087.176-9'
        left join public.usuarios as comer on ser.fk_comercial=comer.usu_rut
        left join public.clientes as cli_fact on ser.fk_cliente_facturacion=cli_fact.cli_codigo
        left join public.clientes as cli_desp on ser.fk_cliente_despacho=cli_desp.cli_codigo
        left join public.naves as nave on ser.fk_nave=nave.nave_id
        left join public.naves_etas as eta on ser.fk_eta=eta.eta_id
        left join public.contenedores_tipos as cont_tip on ser.fk_tipo_contenedor=cont_tip.cont_id
        left join public.contenedores_tamanos as cont_tam on ser.fk_contenedor_tamano=cont_tam.conttam_id

        left join public.servicios_etapas as eta_1 on ser.id=eta_1.fk_servicio and eta_1.tipo=1
        left join public.direcciones as dir_1 on eta_1.fk_direccion=dir_1.id
        left join public.comunas as com_1 on dir_1."comunaComunaId"=com_1.comuna_id
        left join public.servicios_etapas_conductores as cond_eta_1 on eta_1.id=cond_eta_1.fk_etapa
        left join public.usuarios as cond_1 on cond_eta_1.fk_conductor=cond_1.usu_rut
        left join public.taller_equipos as tract_1 on cond_eta_1.fk_tracto=tract_1.id

        left join public.servicios_etapas as eta_2 on ser.id=eta_2.fk_servicio and eta_2.tipo=2
        left join public.direcciones as dir_2 on eta_2.fk_direccion=dir_2.id
        left join public.comunas as com_2 on dir_2."comunaComunaId"=com_2.comuna_id
        left join public.servicios_etapas_conductores as cond_eta_2 on eta_2.id=cond_eta_2.fk_etapa
        left join public.usuarios as cond_2 on cond_eta_2.fk_conductor=cond_2.usu_rut
        left join public.taller_equipos as tract_2 on cond_eta_2.fk_tracto=tract_2.id

        left join public.servicios_etapas as eta_3 on ser.id=eta_3.fk_servicio and eta_3.tipo=3
        left join public.direcciones as dir_3 on eta_3.fk_direccion=dir_3.id
        left join public.comunas as com_3 on dir_3."comunaComunaId"=com_3.comuna_id
        left join public.servicios_etapas_conductores as cond_eta_3 on eta_3.id=cond_eta_3.fk_etapa
        left join public.usuarios as cond_3 on cond_eta_3.fk_conductor=cond_3.usu_rut
        left join public.taller_equipos as tract_3 on cond_eta_3.fk_tracto=tract_3.id

        where
        (
            ser.estado!=2 and ser.estado!=999
            and ( eta_2.fecha='' OR eta_2.fecha='0' OR eta_2.fecha is null )
        )
        order by
        ser.id
        asc
`

