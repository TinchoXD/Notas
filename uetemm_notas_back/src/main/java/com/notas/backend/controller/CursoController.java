package com.notas.backend.controller;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.auth.AuthResponse;
import com.notas.backend.auth.RegisterRequest;
import com.notas.backend.dto.UserDTO;
import com.notas.backend.model.Curso;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.request.PasswordRequest;
import com.notas.backend.request.UserRequest;
import com.notas.backend.response.MessageResponse;
import com.notas.backend.services.CursoService;
import com.notas.backend.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/api/cursos")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4600"})
public class CursoController {

    @Autowired
    CursoService cursoService;


    @GetMapping("/curso/user/{id}")
    public List<Curso> getCursoByUserId(@PathVariable int id) {
        return cursoService.getCursoByUserId(id);
    }

    @PostMapping(value = "/curso/agregarCurso")
    public ResponseEntity<Object> postCurso(@RequestBody CursoRequest request)
    {
        return ResponseEntity.ok(cursoService.postCurso(request));
    }

/* 
    @GetMapping("/user/verificarUsername/{username}")
    public Boolean getMethodName(@PathVariable String username) {
        return userService.verificarUsername(username);
    } */
    



}
