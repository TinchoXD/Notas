package com.notas.backend.model;

import java.util.Date;

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
@Table(name = "novedad_curso_estudiante", uniqueConstraints = { @UniqueConstraint(columnNames = { "noce_id" }) })
@AttributeOverrides({
        @AttributeOverride(name = "fecha_creacion", column = @Column(name = "noce_fecha_creacion")),
        @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "noce_fecha_modificacion")),
        @AttributeOverride(name = "user_creacion", column = @Column(name = "noce_user_creacion")),
        @AttributeOverride(name = "user_modificacion", column = @Column(name = "noce_user_modificacion")),

})
public class NovedadCursoEstudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noce_id", nullable = false)
    public int id;

    @ManyToOne
    @JoinColumn(name = "curs_id", nullable = true)
    public Curso curso;



    @ManyToOne
    @JoinColumn(name = "estu_id", nullable = true)
    public Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    public User profesor;

    @Column(name = "noce_fecha_registro", nullable = true)
    public Date fechaRegistro;

    @Column(name = "noce_descripcion", nullable = true)
    public String descripcion;

    @ManyToOne
    @JoinColumn(name = "asig_id", nullable = true)
    public Catalogo asignatura;

}
