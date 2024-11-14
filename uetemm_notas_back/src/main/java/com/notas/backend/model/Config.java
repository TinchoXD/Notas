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
@Table(name = "config", uniqueConstraints = { @UniqueConstraint(columnNames = { "conf_id" }) })
@AttributeOverrides({
        @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "conf_fecha_modificacion")),
        @AttributeOverride(name = "user_modificacion", column = @Column(name = "conf_user_modificacion"))
})
public class Config {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "conf_id", nullable = false)
    public int id;

    @Column(name = "conf_key")
    public String key;

    @Column(name = "conf_value")
    public String value;

    @Column(name = "conf_descripcion")
    public String descripcion;

}
