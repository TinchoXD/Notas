package com.notas.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

//* METODO ANTERIOR */
    /* 
    @Modifying()
    @Query("update User u set u.firstname=:firstname, u.lastname=:lastname, u.pais=:pais where u.id = :id")
    void updateUser(@Param(value = "id") Integer id, @Param(value = "firstname") String firstname,
            @Param(value = "lastname") String lastname, @Param(value = "pais") String pais);
 */
            
    @Modifying()
    @Query("update User u set u.firstname=:firstname, u.lastname=:lastname, u.pais=:pais , u.estado_civil=:estado_civil where u.id = :id")
    void updateUser(@Param(value = "id") Integer id, @Param(value = "firstname") String firstname,
            @Param(value = "lastname") String lastname, @Param(value = "pais") String pais, @Param(value = "estado_civil") Catalogo estado_civil);

    @Modifying()
    @Query("update User u set u.password=:password where u.id = :id")
    void updatePassword(@Param(value = "id") Integer id, @Param(value = "password") String password);

}
