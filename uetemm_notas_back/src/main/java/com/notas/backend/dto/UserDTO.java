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

    private String username;

    private int role;

    private String pais;

    private Integer estadoCivil;

    private Integer user_relacion_laboral;
    private Integer user_jornada_laboral;
    private Integer user_categoria;
    private Integer user_grupo_etnico;
    private Integer user_grupo_etnico_otro;
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

    

    public UserDTO(Integer id, String firstname, String lastname, String username, int role, String pais,
            Integer estadoCivil, Integer user_relacion_laboral, Integer user_jornada_laboral, Integer user_categoria,
            Integer user_grupo_etnico, Integer user_grupo_etnico_otro, Integer user_nivel_educacion,
            Integer user_estado_usuario, String user_direccion, String user_telefono_celular,
            String user_telefono_convencional, String user_email_personal, String user_email_institucional,
            String user_distrito, Date user_fecha_nacimiento, String user_titulo_senescyt,
            String user_especialidad_accion_personal) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.role = role;
        this.pais = pais;
        this.estadoCivil = estadoCivil;
        this.user_relacion_laboral = user_relacion_laboral;
        this.user_jornada_laboral = user_jornada_laboral;
        this.user_categoria = user_categoria;
        this.user_grupo_etnico = user_grupo_etnico;
        this.user_grupo_etnico_otro = user_grupo_etnico_otro;
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
    }




    public UserDTO() {
    }

}
