package com.notas.backend.controller;

import java.util.List;

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
import com.notas.backend.request.CatalogoRequest;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.services.CatogoService;
import com.notas.backend.services.NotaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notas")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4600" })
public class NotaController {

    @Autowired
    CatogoService catalogoService;

    @Autowired
    NotaService notaService;

    @GetMapping("/all")
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
    }

    @GetMapping("/nota/estudiante/{estu_id}/cursoProfesor/{cupr_id}")
    public ResponseEntity<Object> getNotasByEstudianteIdAndCursoProfesorId(@PathVariable int estu_id,
            @PathVariable int cupr_id) {
        try { 
            List<Nota> notas = notaService.getNotasByEstudianteIdAndCursoProfesorId(estu_id, cupr_id);
            return ResponseEntity.ok(notas);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "Error al consultar lista de notas por id de estudiante: " + estu_id + " y id de Curso-Profesor: "
                            + cupr_id,
                    HttpStatus.BAD_REQUEST);
        }
    }

}
