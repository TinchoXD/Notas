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

import com.notas.backend.request.ConfiguracionFechasRequest;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.services.ConfiguracionFechasService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/configuracionFechas")
@RequiredArgsConstructor
@CrossOrigin(origins = { "*" })
/* @CrossOrigin(origins = { "http://localhost:4600" }) */
public class ConfiguracionFechasController {

    @Autowired
    ConfiguracionFechasService configuracionFechasService;

    @GetMapping("")
    public ResponseEntity<Object> getConfirugacionFechas() {
        try {
            return ResponseEntity.ok(configuracionFechasService.getAllFechas());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al obtener la lista de configuracion de Fechas", HttpStatus.BAD_REQUEST);
        }
    }

        // * GUARDAR CONFIGURACION FECHAS */
    @PostMapping(value = "/guardarConfiguracionFechas")
    public ResponseEntity<Object> guardarConfiguracionFechas(@RequestBody ConfiguracionFechasRequest[] request) {
        return ResponseEntity.ok(configuracionFechasService.guardarConfiguracionFechas(request)); 
    }

}
