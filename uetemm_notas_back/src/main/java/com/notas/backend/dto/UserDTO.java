package com.notas.backend.dto;

import java.util.Date;

import com.notas.backend.model.Catalogo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Integer id;

    private String firstname;

    private String lastname;

    private Integer user_sexo;
    
    private String username;

    private int role;

    private String pais;

    private Integer estadoCivil;

    private Integer user_relacion_laboral;
    private Integer user_jornada_laboral;
    private Integer user_categoria;
    private Integer user_grupo_etnico;
    private Integer user_nacionalidad_indigena;
    private Integer user_nivel_educacion;
    private Integer user_estado_usuario;
    /* private Boolean user_estado_usuario; */

    private String user_direccion;
    private String user_telefono_celular;
    private String user_telefono_convencional;
    private String user_email_personal;
    private String user_email_institucional;
    private String user_distrito;
    private Date user_fecha_nacimiento;
    private String user_titulo_senescyt;
    private String user_especialidad_accion_personal;

    private Boolean user_status;
    
    public Integer user_actividad_laboral;

    public Integer user_nivel;

    public Integer user_activo;

    public Date user_fecha_ingreso_magisterio;
    public Date user_fecha_ingreso_institucion;
    public String user_observacion;

    





    public UserDTO(Integer id, String firstname, String lastname, Integer user_sexo, String username, int role, String pais,
            Integer estadoCivil, Integer user_relacion_laboral, Integer user_jornada_laboral, Integer user_categoria,
            Integer user_grupo_etnico, Integer user_nacionalidad_indigena, Integer user_nivel_educacion,
            Integer user_estado_usuario, String user_direccion, String user_telefono_celular,
            String user_telefono_convencional, String user_email_personal, String user_email_institucional,
            String user_distrito, Date user_fecha_nacimiento, String user_titulo_senescyt,
            String user_especialidad_accion_personal, Integer user_actividad_laboral,
            Integer user_nivel, Integer user_activo, Date user_fecha_ingreso_magisterio,
            Date user_fecha_ingreso_institucion, String user_observacion) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.user_sexo = user_sexo;
        this.username = username;
        this.role = role;
        this.pais = pais;
        this.estadoCivil = estadoCivil;
        this.user_relacion_laboral = user_relacion_laboral;
        this.user_jornada_laboral = user_jornada_laboral;
        this.user_categoria = user_categoria;
        this.user_grupo_etnico = user_grupo_etnico;
        this.user_nacionalidad_indigena = user_nacionalidad_indigena;
        this.user_nivel_educacion = user_nivel_educacion;
        this.user_estado_usuario = user_estado_usuario;
        this.user_direccion = user_direccion;
        this.user_telefono_celular = user_telefono_celular;
        this.user_telefono_convencional = user_telefono_convencional;
        this.user_email_personal = user_email_personal;
        this.user_email_institucional = user_email_institucional;
        this.user_distrito = user_distrito;
        this.user_fecha_nacimiento = user_fecha_nacimiento;
        this.user_titulo_senescyt = user_titulo_senescyt;
        this.user_especialidad_accion_personal = user_especialidad_accion_personal;
        this.user_actividad_laboral = user_actividad_laboral;
        this.user_nivel = user_nivel;
        this.user_activo = user_activo;
        this.user_fecha_ingreso_magisterio = user_fecha_ingreso_magisterio;
        this.user_fecha_ingreso_institucion = user_fecha_ingreso_institucion;
        this.user_observacion = user_observacion;
    }







    public UserDTO() {
    }

}
