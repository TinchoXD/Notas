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



    public UserDTO(Integer id, String firstname, String lastname, String username, int role, String pais, Catalogo estadoCivil) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.role = role;
        this.pais = pais;
        this.estadoCivil = estadoCivil;
    }




    public UserDTO() {
    }

}
