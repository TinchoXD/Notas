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
@Table(name = "nota_comportamiento", uniqueConstraints = { @UniqueConstraint(columnNames = { "noco_id" }) })
@AttributeOverrides({
        @AttributeOverride(name = "fecha_creacion", column = @Column(name = "noco_fecha_creacion")),
        @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "noco_fecha_modificacion")),
        @AttributeOverride(name = "user_creacion", column = @Column(name = "noco_user_creacion")),
        @AttributeOverride(name = "user_modificacion", column = @Column(name = "noco_user_modificacion")),

})
public class NotaComportamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "noco_id", nullable = false)
    public int id;

    @Column(name = "noco_aporte_i", nullable = true)
    public double calificacionT1;

    @Column(name = "noco_aporte_ii", nullable = true)
    public double calificacionT2;

    @Column(name = "noco_aporte_iii", nullable = true)
    public double calificacionT3;

    @ManyToOne
    @JoinColumn(name = "curs_id", nullable = true)
    public Curso curso;

    @ManyToOne
    @JoinColumn(name = "estu_id", nullable = true)
    public Estudiante estudiante;

}
