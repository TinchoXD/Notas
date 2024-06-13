package com.notas.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.dto.UserDTO;
import com.notas.backend.services.AdministracionUsuariosService;
import com.notas.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/administracionUsuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200" })
public class AdministracionUsuariosController {

    @Autowired
    AdministracionUsuariosService administracionUsuariosService;

    @Autowired
    UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<Object> getAllUsers() {
        
        try {
            return ResponseEntity.ok(administracionUsuariosService.getAllUsers());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al obtener la lista de usuarios", HttpStatus.BAD_REQUEST);
            }
    }

}
