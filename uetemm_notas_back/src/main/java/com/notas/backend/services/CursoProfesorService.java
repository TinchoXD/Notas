package com.notas.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Curso;
import com.notas.backend.model.CursoProfesor;
import com.notas.backend.model.User;
import com.notas.backend.repository.CursoProfesorRepository;
import com.notas.backend.repository.CursoRepository;
import com.notas.backend.repository.UserRepository;
import com.notas.backend.request.CursoProfesorRequest;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.response.MessageResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CursoProfesorService {

    @Autowired
    CursoRepository cursoRepository;

    @Autowired
    CursoProfesorRepository cursoProfesorRepository;

    @Autowired
    UserRepository userRepository;

    public List<CursoProfesor> getCursoProfesor() {
        List<CursoProfesor> cursos = cursoProfesorRepository.findAll();
        return cursos;
    }

    public CursoProfesor getCursoProfesorById(int id) {
        CursoProfesor cursos = cursoProfesorRepository.findById(id);
        return cursos;
    }

    public CursoProfesor getCursoProfesorByCursoIdAndAsignaturaId(int user_id, int asig_id) {
        CursoProfesor cursos = cursoProfesorRepository.findByCursoIdAndAsignaturaId(user_id, asig_id);
        return cursos;
    }


    public List<CursoProfesor> getCursoProfesorActivos() {
        List<CursoProfesor> cursos = cursoProfesorRepository.findByStatus(1);
        return cursos;
    }

    public List<CursoProfesor> getCursoProfesorByCursoId(int curs_id) {
        List<CursoProfesor> curso = cursoProfesorRepository.findByCursoId(curs_id);
        return curso;
    }

    public List<CursoProfesor> getCursoProfesorByUserId(int user_id) {
        List<CursoProfesor> curso = cursoProfesorRepository.findByUserId(user_id);
        return curso;
    }

    @Transactional
    public MessageResponse postCursoProfesor(CursoProfesorRequest cursoProfesorRequest) {

        Curso curso = Curso.builder().id(cursoProfesorRequest.getCurso_id()).build();
        Catalogo asignatura = new Catalogo(cursoProfesorRequest.getAsignatura_id(), "", null, null);
        User user = userRepository.findUserById(cursoProfesorRequest.user_id);

        CursoProfesor cursoProfesor = CursoProfesor.builder().id(cursoProfesorRequest.id).curso(curso)
                .asignatura(asignatura).user(user).descripcion("null").status(1).build();

        cursoProfesorRepository.save(cursoProfesor);

        return new MessageResponse("El Curso-Profesor se agregó satisfactoriamente.");
    }

    public List<Curso> getCursos() {
        List<Curso> cursos = cursoRepository.findAll();
        return cursos;
    }

    public List<Curso> getCursosActivos() {
        List<Curso> cursos = cursoRepository.findByStatus(1);
        return cursos;
    }

    @Transactional
    public MessageResponse postCurso(CursoRequest cursoRequest) {

        Catalogo nivelAsignatura = new Catalogo(cursoRequest.nivel, "", null, null);
        Catalogo subnivelAsignatura = new Catalogo(cursoRequest.subnivel, "", null, null);
        Catalogo grado = new Catalogo(cursoRequest.grado, "", null, null);
        Catalogo paralelo = new Catalogo(cursoRequest.paralelo, "", null, null);
        /*
         * Catalogo asignatura = new Catalogo(cursoRequest.asignatura, "", null, null);
         */
        Catalogo jornada = new Catalogo(cursoRequest.jornada, "", null, null);
        User user = new User();
        if (cursoRequest.user_id != 0) {
            user = User.builder().id(cursoRequest.user_id).build();
            Curso curso = Curso.builder().id(cursoRequest.id).nivel(nivelAsignatura).subnivel(subnivelAsignatura)
                    .grado(grado)
                    .paralelo(paralelo).jornada(jornada).descripcion(cursoRequest.descripcion).user(user)
                    .status(1)
                    .build();
            cursoRepository.save(curso);
        } else {
            user = User.builder().id(null).build();
            Curso curso = Curso.builder().id(cursoRequest.id).nivel(nivelAsignatura).subnivel(subnivelAsignatura)
                    .grado(grado)
                    .paralelo(paralelo).jornada(jornada).descripcion(cursoRequest.descripcion)
                    .status(1)
                    .build();
            cursoRepository.save(curso);
        }

        return new MessageResponse("El Curso se agregó satisfactoriamente.");
    }

    @Transactional
    public MessageResponse delCurso(CursoRequest cursoRequest) {

        Optional<Curso> curso = cursoRepository.findById(cursoRequest.id);

        curso.get().status = 0;

        cursoRepository.save(curso.get());
        return new MessageResponse("El Curso se Eliminó satisfactoriamente.");
    }

}
