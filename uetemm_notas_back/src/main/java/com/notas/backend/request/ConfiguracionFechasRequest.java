package com.notas.backend.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfiguracionFechasRequest {

    public String fechaConfigTipo;
    public Date fechaConfigInicio;
    public Date fechaConfigFin;
    
}
