package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.notas.backend.model.Curso;
import com.notas.backend.model.CursoProfesor;


public interface CursoProfesorRepository extends JpaRepository<CursoProfesor,Integer> {

    List<CursoProfesor> findByUserId(Integer user_id); 
    
    List<CursoProfesor> findByCursoId(Integer curs_id); 

    List<CursoProfesor> findByStatus(int active); 

    CursoProfesor findById(int id);
    

}
