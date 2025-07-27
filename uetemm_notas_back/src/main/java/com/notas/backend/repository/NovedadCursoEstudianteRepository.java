package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.NovedadCursoEstudiante;

public interface NovedadCursoEstudianteRepository extends JpaRepository<NovedadCursoEstudiante, Integer> {


    NovedadCursoEstudiante findById(int id);

    List<NovedadCursoEstudiante> findByCursoIdAndEstudianteId(int cursoId, int estudianteId);
    
    List<NovedadCursoEstudiante> findByEstudianteIdOrderByFechaRegistroDesc(int estudianteId);



}
