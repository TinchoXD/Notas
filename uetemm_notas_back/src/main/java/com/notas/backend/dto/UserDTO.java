package com.notas.backend.dto;

import com.notas.backend.model.Catalogo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDTO {

    private Integer id;

    private String firstname;

    private String lastname;
    
    private String username;

    private int role;

    private String pais;

    private Catalogo estadoCivil;

    public String user_direccion;
    public String user_telefono_celular;
    public String user_telefono_convencional;
    public String user_email_personal;
    public String user_email_institucional;
    public String user_distrito;

    public UserDTO(Integer id, String firstname, String lastname, String username, int role, String pais,
            Catalogo estadoCivil, String user_direccion, String user_telefono_celular,
            String user_telefono_convencional, String user_email_personal, String user_email_institucional,
            String user_distrito) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.role = role;
        this.pais = pais;
        this.estadoCivil = estadoCivil;
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
