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
@Table(name = "curso_profesor", uniqueConstraints = { @UniqueConstraint(columnNames = { "cupr_id" }) })
@AttributeOverrides({
    @AttributeOverride(name = "fecha_creacion", column = @Column(name = "cupr_fecha_creacion")),
    @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "cupr_fecha_modificacion")),
    @AttributeOverride(name = "user_creacion", column = @Column(name = "cupr_user_creacion")),
    @AttributeOverride(name = "user_modificacion", column = @Column(name = "cupr_user_modificacion")),

})
public class CursoProfesor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cupr_id", nullable = false)
    public int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    public User user;

    @ManyToOne
    @JoinColumn(name = "curs_id", nullable = true)
    public Curso curso;

    @ManyToOne
    @JoinColumn(name = "asig_id", nullable = true)
    public Catalogo asignatura;

    @Column(name = "cupr_descripcion", nullable = true)
    public String descripcion; 

    @Column(name = "cupr_status", nullable = true)
    public int status;
    
}
