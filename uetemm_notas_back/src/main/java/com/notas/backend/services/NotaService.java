package com.notas.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Curso;
import com.notas.backend.model.CursoProfesor;
import com.notas.backend.model.Estudiante;
import com.notas.backend.model.Nota;
import com.notas.backend.model.NotaAcompaniamientoIntegralAula;
import com.notas.backend.model.NotaAnimacionLectura;
import com.notas.backend.model.NotaComportamiento;
import com.notas.backend.repository.CatalogoRepository;
import com.notas.backend.repository.NotaAcompaniamientoIntegralAulaRepository;
import com.notas.backend.repository.NotaAnimacionLectucaRepository;
import com.notas.backend.repository.NotaComportamientoRepository;
import com.notas.backend.repository.NotaRepository;
import com.notas.backend.request.CatalogoRequest;
import com.notas.backend.request.NotaComplementariaRequest;
import com.notas.backend.request.NotaRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class NotaService {

    @Autowired
    CatalogoRepository catalogoRepository;

    @Autowired
    NotaRepository notaRepository;

    @Autowired
    NotaAnimacionLectucaRepository notaAnimacionLectucaRepository;

    @Autowired
    NotaAcompaniamientoIntegralAulaRepository notaAcompaniamientoIntegralAulaRepository;

    @Autowired
    NotaComportamientoRepository notaComportamientoRepository;

    public List<Nota> getAllNotas() {
        List<Nota> resultList = notaRepository.findAll();
        return resultList;
    }

    public List<Nota> getNotasByEstudianteId(int estu_id) {
        List<Nota> resuList = notaRepository.findByEstudianteId(estu_id);
        return resuList;
    }

    public List<Nota> getNotasByCursoProfesorId(int cupr_id) {
        List<Nota> resuList = notaRepository.findByCursoProfesorId(cupr_id);
        return resuList;
    }

    public Nota getNotaByEstudianteIdAndCursoProfesorId(int estu_id, int cupr_id) {
        Nota nota = notaRepository.findByEstudianteIdAndCursoProfesorId(estu_id, cupr_id);
        return nota;
    }

    /*
     * public List<Nota> getNotasByEstudianteIdAndCursoProfesorId(int estu_id, int
     * cupr_id) {
     * List<Nota> resuList =
     * notaRepository.findByEstudianteIdAndCursoProfesorId(estu_id, cupr_id);
     * return resuList;
     * }
     */

    @Transactional
    public MessageResponse postNota(NotaRequest notaRequest) {

        Nota nota = notaRepository.findByEstudianteIdAndCursoProfesorId(notaRequest.estu_id, notaRequest.cupr_id);

        if (nota == null) {
            nota = new Nota();

            Estudiante estudiante = new Estudiante();
            estudiante.setId(notaRequest.estu_id);

            CursoProfesor cursoProfesor = new CursoProfesor();
            cursoProfesor.setId(notaRequest.cupr_id);

            nota.setEstudiante(estudiante);
            nota.setCursoProfesor(cursoProfesor);
        }

        nota.setCalificacionT1(notaRequest.notaT1);
        nota.setCalificacionT2(notaRequest.notaT2);
        nota.setCalificacionT3(notaRequest.notaT3);
        nota.setCalificacionSupletorio(notaRequest.notaSupletorio);

        notaRepository.save(nota);

        return new MessageResponse("La Nota se guardó satisfactoriamente");
    }

    /*
     * ===============================
     * Nota Animacion a la Lectura
     * ===============================
     */
    public NotaAnimacionLectura getNotaAnimacionLecturaByEstudianteIdAndCursoId(int estu_id, int curs_id) {
        NotaAnimacionLectura nota = notaAnimacionLectucaRepository.findByEstudianteIdAndCursoId(estu_id, curs_id);
        return nota;
    }

    @Transactional
    public MessageResponse postNotaAnimacionLectura(NotaComplementariaRequest notaRequest) {

        NotaAnimacionLectura notaAnimacionLectura = notaAnimacionLectucaRepository
                .findByEstudianteIdAndCursoId(notaRequest.estu_id, notaRequest.curs_id);

        if (notaAnimacionLectura == null) {
            notaAnimacionLectura = new NotaAnimacionLectura();

            Estudiante estudiante = new Estudiante();
            estudiante.setId(notaRequest.estu_id);

            Curso curso = new Curso();
            curso.setId(notaRequest.curs_id);

            notaAnimacionLectura.setEstudiante(estudiante);
            notaAnimacionLectura.setCurso(curso);
        }

        notaAnimacionLectura.setCalificacionT1(notaRequest.notaT1);
        notaAnimacionLectura.setCalificacionT2(notaRequest.notaT2);
        notaAnimacionLectura.setCalificacionT3(notaRequest.notaT3);

        notaAnimacionLectucaRepository.save(notaAnimacionLectura);

        return new MessageResponse("La Nota Acompañamiento a la Lectura se guardó satisfactoriamente");
    }

    /*
     * ===============================
     * Nota ACOMPAÑAMIENTO INTEGRAL EN EL AULA
     * ===============================
     */
    public NotaAcompaniamientoIntegralAula getNotaAcompaniamientoIntegralByEstudianteIdAndCursoId(int estu_id,
            int curs_id) {
        NotaAcompaniamientoIntegralAula nota = notaAcompaniamientoIntegralAulaRepository
                .findByEstudianteIdAndCursoId(estu_id, curs_id);
        return nota;
    }

    @Transactional
    public MessageResponse postNotaAcompaniamientoIntegralAula(NotaComplementariaRequest notaRequest) {

        NotaAcompaniamientoIntegralAula notaAcompaniamientoIntegralAula = notaAcompaniamientoIntegralAulaRepository
                .findByEstudianteIdAndCursoId(notaRequest.estu_id, notaRequest.curs_id);

        if (notaAcompaniamientoIntegralAula == null) {
            notaAcompaniamientoIntegralAula = new NotaAcompaniamientoIntegralAula();

            Estudiante estudiante = new Estudiante();
            estudiante.setId(notaRequest.estu_id);

            Curso curso = new Curso();
            curso.setId(notaRequest.curs_id);

            notaAcompaniamientoIntegralAula.setEstudiante(estudiante);
            notaAcompaniamientoIntegralAula.setCurso(curso);
        }

        notaAcompaniamientoIntegralAula.setCalificacionT1(notaRequest.notaT1);
        notaAcompaniamientoIntegralAula.setCalificacionT2(notaRequest.notaT2);
        notaAcompaniamientoIntegralAula.setCalificacionT3(notaRequest.notaT3);

        notaAcompaniamientoIntegralAulaRepository.save(notaAcompaniamientoIntegralAula);

        return new MessageResponse("La Nota Acompañamiento Integral en el Aula se guardó satisfactoriamente");
    }

    /*
     * ===============================
     * Nota COMPORTAMIENTO
     * ===============================
     */
    public NotaComportamiento getNotaComportamientoByEstudianteIdAndCursoId(int estu_id, int curs_id) {
        NotaComportamiento nota = notaComportamientoRepository.findByEstudianteIdAndCursoId(estu_id, curs_id);
        return nota;
    }

    @Transactional
    public MessageResponse postNotaComportamiento(NotaComplementariaRequest notaRequest) {

        NotaComportamiento notaComportamiento = notaComportamientoRepository
                .findByEstudianteIdAndCursoId(notaRequest.estu_id, notaRequest.curs_id);

        if (notaComportamiento == null) {
            notaComportamiento = new NotaComportamiento();

            Estudiante estudiante = new Estudiante();
            estudiante.setId(notaRequest.estu_id);

            Curso curso = new Curso();
            curso.setId(notaRequest.curs_id);

            notaComportamiento.setEstudiante(estudiante);
            notaComportamiento.setCurso(curso);
        }

        notaComportamiento.setCalificacionT1(notaRequest.notaT1);
        notaComportamiento.setCalificacionT2(notaRequest.notaT2);
        notaComportamiento.setCalificacionT3(notaRequest.notaT3);

        notaComportamientoRepository.save(notaComportamiento);

        return new MessageResponse("La Nota Acompañamiento Integral en el Aula se guardó satisfactoriamente");
    }

}
