package com.notas.backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotaRequest {
    
    public int id;
    
    public int estu_id;
    public int cupr_id;
    
    public double notaT1;
    public double notaT2;
    public double notaT3;
    public double notaSupletorio;
    
    public String notaT1Cualitativa;
    public String notaT2Cualitativa;
    public String notaT3Cualitativa;
    
}
