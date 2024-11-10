package com.notas.backend.model;



import java.util.Date;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "configuracion_fechas", uniqueConstraints = { @UniqueConstraint(columnNames = { "cofe_id" }) })
@AttributeOverrides({
    @AttributeOverride(name = "fecha_creacion", column = @Column(name = "cofe_fecha_creacion")),
    @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "cofe_fecha_modificacion")),
    @AttributeOverride(name = "user_creacion", column = @Column(name = "cofe_user_creacion")),
    @AttributeOverride(name = "user_modificacion", column = @Column(name = "cofe_user_modificacion")),

})
public class ConfiguracionFechas {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cofe_id", nullable = false)
    public int id;

    @Column(name = "cofe_tipo", nullable = true)
    public String tipo; 

    @Column(name = "cofe_inicio", nullable = true)
    public Date fechaInicio;

    @Column(name = "cofe_fin", nullable = true)
    public Date fechaFin;
    
}
