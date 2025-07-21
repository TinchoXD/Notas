package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.Nota;
import com.notas.backend.model.NovedadCursoEstudiante;

public interface NovedadCursoEstudianteRepository extends JpaRepository<NovedadCursoEstudiante, Integer> {

    // Buscar por estudianteId
    /* List<Nota> findByEstudianteId(int estudianteId); */

    // Buscar por cursoProfesorId

    List<NovedadCursoEstudiante> findByCursoIdAndEstudianteId(int cursoId, int estudianteId);

    // Buscar por estudianteId y cursoProfesorId
    //List<Nota> findByEstudianteIdAndCursoProfesorId(int estudianteId, int cursoProfesorId);
   
    // Buscar por estudianteId y cursoProfesorId
/*     Nota findByEstudianteIdAndCursoProfesorId(int estudianteId, int cursoProfesorId); */
}
