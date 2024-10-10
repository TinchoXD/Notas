package com.notas.backend.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotaComplementariaRequest {
    
    public int id;
    
    public int estu_id;
    public int curs_id;
    
    public double notaT1;
    public double notaT2;
    public double notaT3;

    
}
