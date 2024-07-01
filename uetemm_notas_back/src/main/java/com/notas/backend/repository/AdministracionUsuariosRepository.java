package com.notas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.User;

public interface AdministracionUsuariosRepository extends JpaRepository<User,Integer> {

}
