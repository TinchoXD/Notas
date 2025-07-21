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

import com.notas.backend.dto.NovedadCursoEstudianteDTO;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.request.NovedadRequest;
import com.notas.backend.services.NovedadCursoEstudianteService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/novedades")
@RequiredArgsConstructor
@CrossOrigin(origins = { "*" })
/* @CrossOrigin(origins = { "http://localhost:4600" }) */
public class NovedadCursoProfesorController {

    /*
     * @Autowired
     * CatogoService catalogoService;
     * 
     * @Autowired
     * NotaService notaService;
     */

    @Autowired
    NovedadCursoEstudianteService novedadCursoEstudianteService;

    /*
     * @GetMapping("/all")
     * public ResponseEntity<Object> getNotasList() {
     * try {
     * return ResponseEntity.ok(notaService.getAllNotas());
     * } catch (Exception e) {
     * e.printStackTrace();
     * return new ResponseEntity<>("error al consultar Lista de Notas",
     * HttpStatus.BAD_REQUEST);
     * }
     * }
     */

    @GetMapping("/curso/{curs_id}/estudiante/{estu_id}")
    public ResponseEntity<Object> getNovedadesByCursoAndEstudianteList(@PathVariable int curs_id,
            @PathVariable int estu_id) {
        try {
            System.out.println("Recuperando novedades del estudiante con ID: " + estu_id + " y curso ID: " + curs_id);
            return ResponseEntity
                    .ok(novedadCursoEstudianteService.getNovedadesByCursoAndEstudianteList(curs_id, estu_id));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    "error al recuperar las novedades del estudiante con ID: " + estu_id + " y curso ID: " + curs_id,
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/dto/curso/{curs_id}/estudiante/{estu_id}")
    public List<NovedadCursoEstudianteDTO> getNovedadesByCursoAndEstudianteListDTO(@PathVariable int curs_id,
            @PathVariable int estu_id) {
        return novedadCursoEstudianteService.getNovedadesByCursoAndEstudianteListDTO(curs_id, estu_id);
    }

    @PostMapping(value = "/registrar-novedad")
    public ResponseEntity<Object> postNovedad(@RequestBody NovedadRequest request) {
        return ResponseEntity.ok(novedadCursoEstudianteService.postNovedad(request));
    }
    


    /*
     * 
     * @GetMapping("/nota/cursoProfesor/{cupr_id}")
     * public ResponseEntity<Object> getNotasByCursoProfesorList(@PathVariable int
     * cupr_id) {
     * try {
     * return ResponseEntity.ok(notaService.getNotasByCursoProfesorId(cupr_id));
     * } catch (Exception e) {
     * e.printStackTrace();
     * return new ResponseEntity<>
     * ("error al consultar Lista de Notas por id de Curso-Profesor:" + cupr_id,
     * HttpStatus.BAD_REQUEST);
     * }
     * }
     * 
     * @GetMapping("/nota/estudiante/{estu_id}/cursoProfesor/{cupr_id}")
     * public ResponseEntity<Object>
     * getNotasByEstudianteIdAndCursoProfesorId(@PathVariable int estu_id,
     * 
     * @PathVariable int cupr_id) {
     * try {
     * Nota notas = notaService.getNotaByEstudianteIdAndCursoProfesorId(estu_id,
     * cupr_id);
     * return ResponseEntity.ok(notas);
     * } catch (Exception e) {
     * e.printStackTrace();
     * return new ResponseEntity<>(
     * "Error al consultar lista de notas por id de estudiante: " + estu_id +
     * " y id de Curso-Profesor: "
     * + cupr_id,
     * HttpStatus.BAD_REQUEST);
     * }
     * }
     * 
     * @PostMapping(value = "/nota/guardarNota")
     * public ResponseEntity<Object> postNota(@RequestBody NotaRequest notaRequest)
     * {
     * 
     * return ResponseEntity.ok(notaService.postNota(notaRequest));
     * }
     */

}
