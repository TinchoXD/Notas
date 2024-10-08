package com.notas.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.notas.backend.dto.UserDTO;
import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Curso;
import com.notas.backend.model.Role;
import com.notas.backend.model.User;
import com.notas.backend.repository.CursoRepository;
import com.notas.backend.repository.UserRepository;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.request.PasswordRequest;
import com.notas.backend.request.UserRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CursoService {

    @Autowired
    CursoRepository cursoRepository;

    public List<Curso> getCursoByUserId(int user_id) {
        List<Curso> curso = cursoRepository.findByUserId(user_id);
        return curso;
    }

    @Transactional
    public MessageResponse postCurso(CursoRequest cursoRequest) {

        Catalogo nivelAsignatura = new Catalogo(cursoRequest.nivel, "", null, null);
        Catalogo subnivelAsignatura = new Catalogo(cursoRequest.subnivel, "", null, null);
        Catalogo grado = new Catalogo(cursoRequest.grado, "", null, null);
        Catalogo paralelo = new Catalogo(cursoRequest.paralelo, "", null, null);
        Catalogo asignatura = new Catalogo(cursoRequest.asignatura, "", null, null);
        Catalogo jornada = new Catalogo(cursoRequest.jornada, "", null, null);
        User user = User.builder().id(cursoRequest.user_id).build();
        Curso curso = Curso.builder().id(cursoRequest.id).nivel(nivelAsignatura).subnivel(subnivelAsignatura).grado(grado)
                .paralelo(paralelo).asignatura(asignatura).jornada(jornada).descripcion(cursoRequest.descripcion)
                .user(user)
                .build();
        cursoRepository.save(curso);
        return new MessageResponse("El Curso se agregó satisfactoriamente.");
    }

}
