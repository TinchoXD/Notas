package com.notas.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.request.ConfiguracionRequest;
import com.notas.backend.services.ConfigService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/config")
@RequiredArgsConstructor
@CrossOrigin(origins = { "*" })
/* @CrossOrigin(origins = { "http://localhost:4600" }) */
public class ConfigController {

    @Autowired
    ConfigService configService;

    @GetMapping("")
    public ResponseEntity<Object> getAllConfig() {
        try {
            return ResponseEntity.ok(configService.getAllConfig());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al obtener la lista de configuracion de Fechas", HttpStatus.BAD_REQUEST);
        }
    }

        // * GUARDAR CONFIGURACION */
    @PostMapping(value = "/guardarConfiguracion")
    public ResponseEntity<Object> guardarConfiguracionFechas(@RequestBody ConfiguracionRequest[] request) {
        return ResponseEntity.ok(configService.guardarConfiguracion(request)); 
    }

}
