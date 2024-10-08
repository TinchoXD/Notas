package com.notas.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Catalogo;
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

        System.out.println("notaaaaaaaaa: " + notaRequest);

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
    *===============================
    * Nota Animacion a la Lectura						
    *===============================
    */
    public NotaAnimacionLectura getNotaAnimacionLecturaByEstudianteIdAndCursoId(int estu_id, int curs_id) {
        NotaAnimacionLectura nota = notaAnimacionLectucaRepository.findByEstudianteIdAndCursoId(estu_id, curs_id); 
        return nota;
    }



 /*
    *===============================
    * Nota ACOMPAÑAMIENTO INTEGRAL EN EL AULA							
    *===============================
    */
    public NotaAcompaniamientoIntegralAula getNotaAcompaniamientoIntegralByEstudianteIdAndCursoId(int estu_id, int curs_id) {
        NotaAcompaniamientoIntegralAula nota = notaAcompaniamientoIntegralAulaRepository.findByEstudianteIdAndCursoId(estu_id, curs_id); 
        return nota;
    }
    
    
    /*
    *===============================
    * Nota COMPORTAMIENTO
    *===============================
    */
      public NotaComportamiento getNotaComportamientoByEstudianteIdAndCursoId(int estu_id, int curs_id) {
        NotaComportamiento nota = notaComportamientoRepository.findByEstudianteIdAndCursoId(estu_id, curs_id); 
          return nota;
      }




}
