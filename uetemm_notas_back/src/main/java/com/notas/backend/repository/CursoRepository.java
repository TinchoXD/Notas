package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.notas.backend.model.Curso;


public interface CursoRepository extends JpaRepository<Curso,Integer> {

    List<Curso> findByUserId(Integer user_id); 

}
