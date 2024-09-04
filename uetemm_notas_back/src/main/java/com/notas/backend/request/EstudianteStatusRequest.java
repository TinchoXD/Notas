package com.notas.backend.request;

import java.util.Date;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Curso;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstudianteStatusRequest {
    
    public int id;
    public String form_id;

   
    public boolean estado;

}
