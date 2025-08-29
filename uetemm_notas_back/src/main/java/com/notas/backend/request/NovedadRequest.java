package com.notas.backend.request;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NovedadRequest {
    public int id;
    public Date fechaRegistro;
    public String descripcion;
    public int cursoId;
    public int estudianteId;
    public int profesorId; // ID del profesor que registra la novedad
    public int asignaturaId;
    
}
