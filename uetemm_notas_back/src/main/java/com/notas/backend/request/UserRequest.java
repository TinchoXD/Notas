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
}
