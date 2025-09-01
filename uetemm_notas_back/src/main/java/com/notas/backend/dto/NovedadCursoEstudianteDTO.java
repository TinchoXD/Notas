package com.notas.backend.dto;

import java.util.Date;

import com.notas.backend.model.Catalogo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NovedadCursoEstudianteDTO {

    private Integer id;

    private Date fechaRegistro;

    private String descripcion;

    private Integer cursoId;
    
    private Integer estudianteId;

    private Integer profesorId;

    private Integer asignaturaId;

   
   

}
