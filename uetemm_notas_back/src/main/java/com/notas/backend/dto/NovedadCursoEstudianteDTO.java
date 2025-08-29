package com.notas.backend.dto;

import java.util.Date;

import jakarta.persistence.criteria.CriteriaBuilder.In;
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

    private Integer asignaturaId;

    public NovedadCursoEstudianteDTO(Integer id, Date fechaRegistro, String descripcion, Integer cursoId, Integer estudianteId, Integer profesorId, Integer asignaturaId) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.descripcion = descripcion;
        this.cursoId = cursoId;
        this.estudianteId = estudianteId;
        this.profesorId = profesorId;
        this.asignaturaId = asignaturaId;
    }





    public NovedadCursoEstudianteDTO() {
    }

}
