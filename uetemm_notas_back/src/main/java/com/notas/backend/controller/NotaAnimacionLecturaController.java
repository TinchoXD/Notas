package com.notas.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.model.Nota;
import com.notas.backend.model.NotaAnimacionLectura;
import com.notas.backend.request.NotaComplementariaRequest;
import com.notas.backend.request.NotaRequest;
import com.notas.backend.services.CatogoService;
import com.notas.backend.services.NotaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notas/notaAnimacionLectura")
@RequiredArgsConstructor
@CrossOrigin(origins = { "*" })
/* @CrossOrigin(origins = { "http://localhost:4600" }) */
public class NotaAnimacionLecturaController {

    @Autowired
    CatogoService catalogoService;

    @Autowired
    NotaService notaService;

   /*  @GetMapping("/all")
    public ResponseEntity<Object> getNotasList() {
        try {
            return ResponseEntity.ok(notaService.getAllNotas());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar Lista de Notas", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/nota/estudiante/{estu_id}")
    public ResponseEntity<Object> getNotasByEstudianteList(@PathVariable int estu_id) {
        try {
            return ResponseEntity.ok(notaService.getNotasByEstudianteId(estu_id));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar Lista de Notas por id de estudiante:" + estu_id,
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/nota/cursoProfesor/{cupr_id}")
    public ResponseEntity<Object> getNotasByCursoProfesorList(@PathVariable int cupr_id) {
        try {
            return ResponseEntity.ok(notaService.getNotasByCursoProfesorId(cupr_id));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar Lista de Notas por id de Curso-Profesor:" + cupr_id,
                    HttpStatus.BAD_REQUEST);
        }
    } */


    /*
    *===============================
    * Nota Animacion a la Lectura
    *===============================
    */
    @GetMapping("/estudiante/{estu_id}/curso/{curs_id}")
    public ResponseEntity<Object> getNotaAnimacionLecturaByEstudianteIdAndCursoId(@PathVariable int estu_id,
            @PathVariable int curs_id) {
        try { 
            NotaAnimacionLectura notaAnimacionLectura = notaService.getNotaAnimacionLecturaByEstudianteIdAndCursoId(estu_id, curs_id);
            return ResponseEntity.ok(notaAnimacionLectura);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Error al consultar nota por id de estudiante: " + estu_id + " y id de Curso: "
                            + curs_id,
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/nota/guardarNotaAnimacionLectura")
    public ResponseEntity<Object> postNotaAnimacionLectura(@RequestBody NotaComplementariaRequest notaRequest) {
        return ResponseEntity.ok(notaService.postNotaAnimacionLectura(notaRequest));
    }
    

}
