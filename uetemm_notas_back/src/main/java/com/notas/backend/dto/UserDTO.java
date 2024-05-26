package com.notas.backend.dto;

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

    private Catalogo estadoCivil;

    private Catalogo user_relacion_laboral;
    public Catalogo user_jornada_laboral;
    public Catalogo user_categoria;
    public Catalogo user_grupo_etnico;
    public Catalogo user_grupo_etnico_otro;
    public Catalogo user_nivel_educacion;
    public Integer user_estado_usuario;

    public String user_direccion;
    public String user_telefono_celular;
    public String user_telefono_convencional;
    public String user_email_personal;
    public String user_email_institucional;
    public String user_distrito;


    
    public UserDTO(Integer id, String firstname, String lastname, String username, int role, String pais,
            Catalogo estadoCivil, Catalogo user_relacion_laboral, Catalogo user_jornada_laboral,
            Catalogo user_categoria, Catalogo user_grupo_etnico, Catalogo user_grupo_etnico_otro,
            Catalogo user_nivel_educacion, Integer user_estado_usuario, String user_direccion,
            String user_telefono_celular, String user_telefono_convencional, String user_email_personal,
            String user_email_institucional, String user_distrito) {
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
    }



    public UserDTO() {
    }

}
