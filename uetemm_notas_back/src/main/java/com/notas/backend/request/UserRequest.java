package com.notas.backend.request;

import com.notas.backend.model.Catalogo;

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
    public String pais;
    public Catalogo estadoCivil;
    public Catalogo user_relacion_laboral;
    public Catalogo user_jornada_laboral;
    public Catalogo user_categoria;
    public Catalogo user_grupo_etnico;
    public Catalogo user_grupo_etnico_otro;
    public Catalogo user_nivel_educacion;
    public String user_direccion;
    public String user_telefono_celular;
    public String user_telefono_convencional;
    public String user_email_personal;
    public String user_email_institucional;
    public String user_distrito;
    public Integer user_estado_usuario;


    public Integer user_status;
}
