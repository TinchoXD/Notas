package com.notas.backend.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
    
    Optional<User> findById(Integer id);

    @Query("select u from User u where u.id = :id")
    User findUserById(@Param("id") Integer id);

    // * METODO ANTERIOR */
    /*
     * @Modifying()
     * 
     * @Query("update User u set u.firstname=:firstname, u.lastname=:lastname, u.pais=:pais where u.id = :id"
     * )
     * void updateUser(@Param(value = "id") Integer id, @Param(value = "firstname")
     * String firstname,
     * 
     * @Param(value = "lastname") String lastname, @Param(value = "pais") String
     * pais);
     */

    @Modifying()
    @Query("update User u set u.firstname=:firstname, u.lastname=:lastname, u.user_sexo=:user_sexo, u.pais=:pais , u.estado_civil=:estado_civil, u.user_direccion=:user_direccion, u.user_telefono_celular=:user_telefono_celular, u.user_telefono_convencional=:user_telefono_convencional, u.user_email_personal=:user_email_personal, u.user_email_institucional=:user_email_institucional, u.user_distrito=:user_distrito, u.user_status=:user_status , u.user_relacion_laboral = :user_relacion_laboral, u.user_jornada_laboral=:user_jornada_laboral, u.user_categoria=:user_categoria, u.user_grupo_etnico=:user_grupo_etnico, u.user_nacionalidad_indigena=:user_nacionalidad_indigena, u.user_nivel_educacion=:user_nivel_educacion, u.user_estado_usuario=:user_estado_usuario, u.user_fecha_nacimiento =:user_fecha_nacimiento , u.user_titulo_senescyt =:user_titulo_senescyt , u.user_especialidad_accion_personal =:user_especialidad_accion_personal, u.user_actividad_laboral=:user_actividad_laboral, u.user_nivel=:user_nivel, u.user_fecha_ingreso_magisterio=:user_fecha_ingreso_magisterio, u.user_fecha_ingreso_institucion=:user_fecha_ingreso_institucion where u.id = :id")
    void updateUser(@Param(value = "id") Integer id,
            @Param(value = "firstname") String firstname,
            @Param(value = "lastname") String lastname,
            @Param(value = "user_sexo") Catalogo user_sexo,
            @Param(value = "pais") String pais,
            @Param(value = "estado_civil") Catalogo estado_civil,
            @Param(value = "user_direccion") String user_direccion,
            @Param(value = "user_telefono_celular") String user_telefono_celular,
            @Param(value = "user_telefono_convencional") String user_telefono_convencional,
            @Param(value = "user_email_personal") String user_email_personal,
            @Param(value = "user_email_institucional") String user_email_institucional,
            @Param(value = "user_distrito") String user_distrito,
            @Param(value = "user_status") Integer user_status,
            @Param(value = "user_relacion_laboral") Catalogo user_relacion_laboral,
            @Param(value = "user_jornada_laboral") Catalogo user_jornada_laboral,
            @Param(value = "user_categoria") Catalogo user_categoria,
            @Param(value = "user_grupo_etnico") Catalogo user_grupo_etnico,
            @Param(value = "user_nacionalidad_indigena") Catalogo user_nacionalidad_indigena,
            @Param(value = "user_nivel_educacion") Catalogo user_nivel_educacion,
            @Param(value = "user_estado_usuario") Integer user_estado_usuario,
            @Param(value = "user_fecha_nacimiento") Date user_fecha_nacimiento,
            @Param(value = "user_titulo_senescyt") String user_titulo_senescyt,
            @Param(value = "user_especialidad_accion_personal") String user_especialidad_accion_personal,
            @Param(value = "user_actividad_laboral") Catalogo user_actividad_laboral,
            @Param(value = "user_nivel") Catalogo user_nivel,
            @Param(value = "user_fecha_ingreso_magisterio") Date user_fecha_ingreso_magisterio,
            @Param(value = "user_fecha_ingreso_institucion") Date user_fecha_ingreso_institucion);

    @Modifying()
    @Query("update User u set u.password=:password where u.id = :id")
    void updatePassword(@Param(value = "id") Integer id, @Param(value = "password") String password);

    @Modifying()
    @Query("update User u set u.password=:password, u.user_requiere_cambio_contrasena=:user_requiere_cambio_contrasena where u.id = :id")
    void resetPassword(@Param(value = "id") Integer id, @Param(value = "password") String password,
            @Param(value = "user_requiere_cambio_contrasena") Integer requiereCambio);

    @Modifying
    @Query(value = "insert into User u (u.firstname , u.lastname, u.username, u.password, u.user_email_personal, u.role) values (:firstname, :lastname, :username, :password, :user_email_personal, :role)")
    @Transactional
    void saveNewUser(@Param("firstname") String firstname, @Param("lastname") String lastname, @Param("username") String username, @Param("password") String password,  @Param("user_email_personal") String user_email_personal,  @Param("role") String role);

}
