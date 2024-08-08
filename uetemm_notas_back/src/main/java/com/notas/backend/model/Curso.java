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
@Table(name = "curso", uniqueConstraints = { @UniqueConstraint(columnNames = { "curs_id" }) })
@AttributeOverrides({
        @AttributeOverride(name = "fecha_creacion", column = @Column(name = "curs_fecha_creacion")),
        @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "curs_fecha_modificacion")),
        @AttributeOverride(name = "user_creacion", column = @Column(name = "curs_user_creacion")),
        @AttributeOverride(name = "user_modificacion", column = @Column(name = "curs_user_modificacion"))
})
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "curs_id", nullable = false)
    public int id;

    @ManyToOne
    @JoinColumn(name = "curs_grado", nullable = true)
    public Catalogo grado;

    @ManyToOne
    @JoinColumn(name = "curs_paralelo", nullable = true)
    public Catalogo paralelo;

    @ManyToOne
    @JoinColumn(name = "curs_asignatura", nullable = true)
    public Catalogo asignatura;

    @ManyToOne
    @JoinColumn(name = "curs_jornada", nullable = true)
    public Catalogo jornada;

    @ManyToOne
    @JoinColumn(name = "curs_nivel", nullable = true)
    public Catalogo nivel;

    @ManyToOne
    @JoinColumn(name = "curs_subnivel", nullable = true)
    public Catalogo subnivel;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    public User user;

    @Column(name = "curs_descripcion")
    public String descripcion;
    
}
