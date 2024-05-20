package com.notas.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.dto.CatalogoDTO;
import com.notas.backend.dto.UserDTO;
import com.notas.backend.services.CatogoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/catalogos")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200" })
public class CatalogoController {

    @Autowired
    CatogoService catalogoService;

    @GetMapping("/estado_civil")
    public ResponseEntity<Object> getEstadoCivilList() {
        try {
            return ResponseEntity.ok(catalogoService.getAllCatalogos());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Estado Civil", HttpStatus.BAD_REQUEST);
            }
    }

    /*
     * @GetMapping("/estado-civil")
     * public UserDTO getEstadoCivil() {
     * return userService.buscarPersona();
     * }
     */

}
