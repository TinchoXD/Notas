package com.notas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.NotaComportamiento;

public interface NotaComportamientoRepository extends JpaRepository<NotaComportamiento, Integer> {

    // Buscar por estudianteId
    //List<Nota> findByEstudianteId(int estudianteId);

    // Buscar por cursoProfesorId
    //List<Nota> findByCursoProfesorId(int cursoProfesorId);

    // Buscar por estudianteId y cursoProfesorId
    //List<Nota> findByEstudianteIdAndCursoProfesorId(int estudianteId, int cursoProfesorId);
   
    // Buscar por estudianteId y cursoId
    NotaComportamiento findByEstudianteIdAndCursoId(int estudianteId, int cursoId);

}
