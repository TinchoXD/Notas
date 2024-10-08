package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.NotaAcompaniamientoIntegralAula;
import com.notas.backend.model.NotaAnimacionLectura;

public interface NotaAcompaniamientoIntegralAulaRepository extends JpaRepository<NotaAcompaniamientoIntegralAula, Integer> {

    // Buscar por estudianteId
    //List<Nota> findByEstudianteId(int estudianteId);

    // Buscar por cursoProfesorId
    //List<Nota> findByCursoProfesorId(int cursoProfesorId);

    // Buscar por estudianteId y cursoProfesorId
    //List<Nota> findByEstudianteIdAndCursoProfesorId(int estudianteId, int cursoProfesorId);
   
    // Buscar por estudianteId y cursoId
    NotaAcompaniamientoIntegralAula findByEstudianteIdAndCursoId(int estudianteId, int cursoId);

}
