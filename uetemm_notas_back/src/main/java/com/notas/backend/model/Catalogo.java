package com.notas.backend.model;



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
@Table(name = "catalogo", uniqueConstraints = { @UniqueConstraint(columnNames = { "cata_id" }) })
@AttributeOverrides({
        @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "cata_fecha_modificacion")),
        @AttributeOverride(name = "user_modificacion", column = @Column(name = "cata_user_modificacion"))
})
public class Catalogo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cata_id", nullable = false)
    public int id;

    @Column(name = "cata_nombre")
    public String nombre;

    @Column(name = "cata_catalogo_parent")
    public Integer catalogoParent;
  
    @Column(name = "cata_status")
    public Integer status;




    
}
