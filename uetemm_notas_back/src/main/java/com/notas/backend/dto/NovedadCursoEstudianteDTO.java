package com.notas.backend.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NovedadCursoEstudianteDTO {

    private Integer id;

    private Date fechaRegistro;

    private String descripcion;

    private Integer cursoId;
    
    private Integer estudianteId;

    private Integer profesorId;

    public NovedadCursoEstudianteDTO(Integer id, Date fechaRegistro, String descripcion, Integer cursoId, Integer estudianteId, Integer profesorId) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.descripcion = descripcion;
        this.cursoId = cursoId;
        this.estudianteId = estudianteId;
        this.profesorId = profesorId;
    }





    public NovedadCursoEstudianteDTO() {
    }

}
