package com.notas.backend.model;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "nota", uniqueConstraints = { @UniqueConstraint(columnNames = { "nota_id" }) })
@AttributeOverrides({
        @AttributeOverride(name = "fecha_creacion", column = @Column(name = "nota_fecha_creacion")),
        @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "nota_fecha_modificacion")),
        @AttributeOverride(name = "user_creacion", column = @Column(name = "nota_user_creacion")),
        @AttributeOverride(name = "user_modificacion", column = @Column(name = "nota_user_modificacion")),

})
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "nota_id", nullable = false)
    public int id;

    @ManyToOne
    @JoinColumn(name = "cupr_id", nullable = true)
    public CursoProfesor cursoProfesor;

    @ManyToOne
    @JoinColumn(name = "estu_id", nullable = true)
    public Estudiante estudiante;

    @Column(name = "nota_aporte_i_calificacion_cuantitativa", nullable = true)
    public double calificacionT1;

    @Column(name = "nota_aporte_i_calificacion_cualitativa", nullable = true)
    public String calificacionT1Cualitativa;

    @Column(name = "nota_aporte_ii_calificacion_cuantitativa", nullable = true)
    public double calificacionT2;

    @Column(name = "nota_aporte_ii_calificacion_cualitativa", nullable = true)
    public String calificacionT2Cualitativa;

    @Column(name = "nota_aporte_iii_calificacion_cuantitativa", nullable = true)
    public double calificacionT3;

    @Column(name = "nota_aporte_iii_calificacion_cualitativa", nullable = true)
    public String calificacionT3Cualitativa; 

}
