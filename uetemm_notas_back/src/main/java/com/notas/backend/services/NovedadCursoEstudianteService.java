package com.notas.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.dto.NovedadCursoEstudianteDTO;
import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Curso;
import com.notas.backend.model.Estudiante;
import com.notas.backend.model.NovedadCursoEstudiante;
import com.notas.backend.model.User;
import com.notas.backend.repository.CatalogoRepository;
import com.notas.backend.repository.CursoRepository;
import com.notas.backend.repository.EstudianteRepository;
import com.notas.backend.repository.NovedadCursoEstudianteRepository;
import com.notas.backend.repository.UserRepository;
import com.notas.backend.request.NovedadRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class NovedadCursoEstudianteService {

    /*
     * @Autowired
     * CatalogoRepository catalogoRepository;
     * 
     * @Autowired
     * NotaRepository notaRepository;
     * 
     * @Autowired
     * NotaAnimacionLectucaRepository notaAnimacionLectucaRepository;
     * 
     * @Autowired
     * NotaAcompaniamientoIntegralAulaRepository
     * notaAcompaniamientoIntegralAulaRepository;
     * 
     * @Autowired
     * NotaComportamientoRepository notaComportamientoRepository;
     */

    @Autowired
    NovedadCursoEstudianteRepository novedadCursoEstudianteRepository;

    @Autowired
    EstudianteRepository estudianteRepository;

    @Autowired
    CursoRepository cursoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CatalogoRepository asignaturaCatalogoRepository;
    /*
     * public List<Nota> getAllNotas() {
     * List<Nota> resultList = notaRepository.findAll();
     * return resultList;
     * }
     */

    public List<NovedadCursoEstudiante> getNovedadesByCursoAndEstudianteList(int curso_id, int estu_id) {
        List<NovedadCursoEstudiante> resuList = novedadCursoEstudianteRepository.findByCursoIdAndEstudianteId(curso_id,
                estu_id);
        return resuList;
    }

    public List<NovedadCursoEstudiante> getNovedadesByEstudiante(int estu_id) {
        List<NovedadCursoEstudiante> resuList = novedadCursoEstudianteRepository.findByEstudianteIdOrderByFechaRegistroDesc(estu_id);
        return resuList;
    }

    public List<NovedadCursoEstudianteDTO> getNovedadesByCursoAndEstudianteListDTO(int curso_id, int estu_id) {
        List<NovedadCursoEstudiante> resuList = novedadCursoEstudianteRepository.findByCursoIdAndEstudianteId(curso_id,
                estu_id);

        List<NovedadCursoEstudianteDTO> resuListDTO = resuList.stream()
                .map(novedad -> new NovedadCursoEstudianteDTO(
                        novedad.getId(),
                        novedad.getFechaRegistro(),
                        novedad.getDescripcion(),
                        novedad.getCurso().getId(),
                        novedad.getEstudiante().getId(),
                        novedad.getProfesor() != null ? novedad.getProfesor().getId() : null,
                        novedad.getAsignatura() != null ? novedad.getAsignatura().getId() : null))
                .toList();

        return resuListDTO;
    }

    @Transactional
    public MessageResponse postNovedad(NovedadRequest novedadRequest) {

        Estudiante estudiante = estudianteRepository.findById(novedadRequest.getEstudianteId());
        if (estudiante == null) {
            throw new RuntimeException("Estudiante no encontrado con ID: " + novedadRequest.getEstudianteId());
        }
        Optional<Curso> curso = cursoRepository.findById(novedadRequest.getCursoId());
        if (curso == null) {
            throw new RuntimeException("Curso no encontrado con ID: " + novedadRequest.getCursoId());
        }

        Optional<User> profesor = userRepository.findById(novedadRequest.getProfesorId());
        if (profesor == null) {
            throw new RuntimeException("Profesor no encontrado con ID: " + novedadRequest.getProfesorId());
        }
        NovedadCursoEstudiante novedad = new NovedadCursoEstudiante();

        Optional<Catalogo> asignatura = asignaturaCatalogoRepository.findById(novedadRequest.getAsignaturaId());

        if (novedadRequest.getId() != 0) {
            novedad = NovedadCursoEstudiante.builder()
                    .id(novedadRequest.getId())
                    .curso(curso.get())
                    .estudiante(estudiante)
                    .profesor(profesor.get())
                    .fechaRegistro(novedadRequest.getFechaRegistro())
                    .descripcion(novedadRequest.getDescripcion())
                    .asignatura(asignatura.get())
                    .build();
            novedadCursoEstudianteRepository.save(novedad);
        } else {
            novedad = NovedadCursoEstudiante.builder()
                    .curso(curso.get())
                    .estudiante(estudiante)
                    .profesor(profesor.get())
                    .asignatura(asignatura.get())
                    .fechaRegistro(novedadRequest.getFechaRegistro())
                    .descripcion(novedadRequest.getDescripcion())
                    .build();
            novedadCursoEstudianteRepository.save(novedad);
        }

        return new MessageResponse("La Novedad se guardó satisfactoriamente");
    }

    @Transactional
    public MessageResponse deleteNovedadById(NovedadRequest novedadRequest) {
        try {
            NovedadCursoEstudiante novedad = novedadCursoEstudianteRepository.findById(novedadRequest.id);

            novedadCursoEstudianteRepository.delete(novedad);

            return new MessageResponse("La Novedad se Eliminó de la Base de datos satisfactoriamente.");
        } catch (Exception e) {
            return new MessageResponse("Error al eliminar la novedad. detalle: " + e);
        }
    }

}
