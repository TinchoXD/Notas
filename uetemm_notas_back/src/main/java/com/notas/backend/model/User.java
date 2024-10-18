package com.notas.backend.model;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "user", uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }) })
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id;
    @Basic
    @Column(nullable = true)
    public String username;
    @Column(nullable = true)
    public String lastname;
    public String firstname;
    @ManyToOne
    @JoinColumn(name = "user_sexo", nullable = true)
    public Catalogo user_sexo;
    public String pais;
    public String password;
    @Enumerated(EnumType.STRING)
    public Role role;

    @ManyToOne
    @JoinColumn(name = "estado_civil", nullable = true)
    public Catalogo estado_civil;
    public String user_direccion;
    public String user_telefono_celular;
    public String user_telefono_convencional;
    public String user_email_personal;
    public String user_email_institucional;
    public String user_distrito;
    @ManyToOne
    @JoinColumn(name = "user_relacion_laboral", nullable = true)
    public Catalogo user_relacion_laboral;
    @ManyToOne
    @JoinColumn(name = "user_jornada_laboral", nullable = true)
    public Catalogo user_jornada_laboral;
    @ManyToOne
    @JoinColumn(name = "user_nivel_educacion", nullable = true)
    public Catalogo user_nivel_educacion;
    @ManyToOne
    @JoinColumn(name = "user_categoria", nullable = true)
    public Catalogo user_categoria; 
    @ManyToOne
    @JoinColumn(name = "user_grupo_etnico", nullable = true)
    public Catalogo user_grupo_etnico;
    @ManyToOne
    @JoinColumn(name = "user_nacionalidad_indigena", nullable = true)
    public Catalogo user_nacionalidad_indigena;
    public Integer user_estado_usuario;
    public Date user_fecha_nacimiento;
    public String user_titulo_senescyt;
    public String user_especialidad_accion_personal;

    public Integer user_requiere_cambio_contrasena;
    public Integer user_status;

    @ManyToOne
    @JoinColumn(name = "user_actividad_laboral", nullable = true)
    public Catalogo user_actividad_laboral;

    @ManyToOne
    @JoinColumn(name = "user_nivel", nullable = true)
    public Catalogo user_nivel;

    @ManyToOne
    @JoinColumn(name = "user_activo", nullable = true)
    public Catalogo user_activo;

    public Date user_fecha_ingreso_magisterio;
    public Date user_fecha_ingreso_institucion;
    public String user_observacion;
    /*
     * @Transient
     * public Integer estado_civil_id;
     */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
