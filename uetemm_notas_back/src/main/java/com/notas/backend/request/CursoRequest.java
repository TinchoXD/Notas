package com.notas.backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CursoRequest {
    public int id;
    public int nivel;
    public int subnivel;
    public int grado;
    public int paralelo;
/*     public int asignatura; */
    public int jornada;
    public String descripcion;
    public int user_id;
    public int status;
    
}
