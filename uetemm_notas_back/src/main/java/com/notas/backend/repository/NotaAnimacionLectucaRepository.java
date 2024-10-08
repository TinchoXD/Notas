package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.notas.backend.model.NotaAnimacionLectura;

public interface NotaAnimacionLectucaRepository extends JpaRepository<NotaAnimacionLectura, Integer> {

    // Buscar por estudianteId
    //List<Nota> findByEstudianteId(int estudianteId);

    // Buscar por cursoProfesorId
    //List<Nota> findByCursoProfesorId(int cursoProfesorId);

    // Buscar por estudianteId y cursoProfesorId
    //List<Nota> findByEstudianteIdAndCursoProfesorId(int estudianteId, int cursoProfesorId);
   
    // Buscar por estudianteId y cursoId
    NotaAnimacionLectura findByEstudianteIdAndCursoId(int estudianteId, int cursoId);

}
