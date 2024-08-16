package com.notas.backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CursoProfesorRequest {
    public int id;
    public int curso_id;
    public int asignatura_id;
    public int user_id;
   
    
}
