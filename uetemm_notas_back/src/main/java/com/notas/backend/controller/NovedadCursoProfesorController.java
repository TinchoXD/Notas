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
import com.notas.backend.model.NovedadCursoEstudiante;
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

    @Autowired
    NovedadCursoEstudianteService novedadCursoEstudianteService;

    @GetMapping("/curso/{curs_id}/estudiante/{estu_id}")
    public ResponseEntity<Object> getNovedadesByCursoAndEstudianteList(@PathVariable int curs_id,
            @PathVariable int estu_id) {
        try {
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

    @GetMapping("/estudiante/{estu_id}")
    public List<NovedadCursoEstudiante> getNovedadesByEstudiante(@PathVariable int estu_id) {
        return novedadCursoEstudianteService.getNovedadesByEstudiante(estu_id);
    }

    @PostMapping(value = "/registrar-novedad")
    public ResponseEntity<Object> postNovedad(@RequestBody NovedadRequest request) {
        System.out.println("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
        return ResponseEntity.ok(novedadCursoEstudianteService.postNovedad(request));
    }

    @PostMapping(value = "/eliminar-novedad")
    public ResponseEntity<Object> deleteNovedad(@RequestBody NovedadRequest request) {
        return ResponseEntity.ok(novedadCursoEstudianteService.deleteNovedadById(request));
    }

}
