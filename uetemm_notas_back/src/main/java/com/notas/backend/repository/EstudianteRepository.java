package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.notas.backend.model.Curso;
import com.notas.backend.model.Estudiante;


public interface EstudianteRepository extends JpaRepository<Estudiante,Integer> {


    List<Estudiante> findByCursoId(int curso_id);

    List<Estudiante> findById(int id);
    
    /* List<Estudiante> findByStatus(int active);  */
    

}
