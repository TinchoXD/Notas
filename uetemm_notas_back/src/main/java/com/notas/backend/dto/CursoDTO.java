package com.notas.backend.dto;

import java.util.Date;

import com.notas.backend.model.Catalogo;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CursoDTO {

    private Integer id;
    private Integer nivel;
    private Integer subnivel;
    private Integer grado;
    private Integer paralelo;
    private Integer user_id;
    private String descripcion;

    public CursoDTO(Integer id, Integer nivel, Integer subnivel, Integer grado, Integer paralelo, Integer user_id,
            String descripcion) {
        this.id = id;
        this.nivel = nivel;
        this.subnivel = subnivel;
        this.grado = grado;
        this.paralelo = paralelo;
        this.user_id = user_id;
        this.descripcion = descripcion;
    }

    public CursoDTO() {
    }

}
