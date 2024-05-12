package com.irojas.demojwt.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDTO {

    private Integer id;

    private String firstname;

    private String lastname;
    
    private String username;

    private int role;

    private String country;




    public UserDTO(Integer id, String firstname, String lastname, String username, int role, String country) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.role = role;
        this.country = country;
    }




    public UserDTO() {
    }

}
