package com.notas.backend.request;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    public int id;
    public String username;
    public String firstname;
    public String lastname;
    public Integer rol;
    public Integer user_sexo;
    public String pais;
    public Integer estadoCivil;
    public Integer user_relacion_laboral;
    public Integer user_jornada_laboral;
    public Integer user_categoria;
    public Integer user_grupo_etnico;
    public Integer user_nacionalidad_indigena;
    public Integer user_nivel_educacion;
    public String user_direccion;
    public String user_telefono_celular;
    public String user_telefono_convencional;
    public String user_email_personal;
    public String user_email_institucional;
    public String user_distrito;
    //public Integer user_estado_usuario;
    public boolean user_estado_usuario;
    public Date user_fecha_nacimiento;
    public String user_titulo_senescyt;
    public String user_especialidad_accion_personal;

    public Integer user_actividad_laboral;
    public Integer user_nivel;
    public Integer user_activo;
    public Date user_fecha_ingreso_magisterio;
    public Date user_fecha_ingreso_institucion;
    


    public Integer user_status;
}
