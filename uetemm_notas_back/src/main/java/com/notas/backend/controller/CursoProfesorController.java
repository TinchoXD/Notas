package com.notas.backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.model.Curso;
import com.notas.backend.model.CursoProfesor;
import com.notas.backend.request.CursoProfesorRequest;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.services.CursoProfesorService;
import com.notas.backend.services.CursoService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/cursosProfesor")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4600" })
public class CursoProfesorController {

    @Autowired
    CursoService cursoService;
    
    @Autowired
    CursoProfesorService cursoProfesorService;


    // * OBTENER TODOS LOS CURSOS - PROFESOR*/
    @GetMapping("/all")
    public List<CursoProfesor> getCursoProfesor() {
        return cursoProfesorService.getCursoProfesor();
    }

    // * OBTENER CURSOS - PROFESOR By ID*/
    @GetMapping("/cursoProfesor/{id}")
    public CursoProfesor getCursoProfesorById(@PathVariable int id) {
        return cursoProfesorService.getCursoProfesorById(id);
    }

    // * OBTENER CURSOS-PROFESOR By CURSO AND ASIGNATURA*/
    @GetMapping("/cursoProfesor/curso/{user_id}/asignatura/{asig_id}")
    public CursoProfesor getCursoProfesorByCursoIdAndAsignaturaId(@PathVariable int user_id, @PathVariable int asig_id) {
        return cursoProfesorService.getCursoProfesorByCursoIdAndAsignaturaId(user_id, asig_id);
    }
   
    // * OBTENER CURSOS - CURSO By ID*/
    @GetMapping("/cursoProfesor/curso/{id}")
    public List<CursoProfesor> getCursoProfesorByCursoId(@PathVariable int id) {
        return cursoProfesorService.getCursoProfesorByCursoId(id);
    }

    // * OBTENER LOS CURSOS-PROFESOR POR ID DE USUARIO */
    @GetMapping("/cursoProfesor/user/{id}")
    public List<CursoProfesor> getCursoByUserId(@PathVariable int id) {
        return cursoProfesorService.getCursoProfesorByUserId(id);
    }

    
    // * GUARDAR NUEVO CURSO-PROFESOR */
    @PostMapping(value = "/cursoProfesor/agregarCursoProfesor")
    public ResponseEntity<Object> postCurso(@RequestBody CursoProfesorRequest request) {
        return ResponseEntity.ok(cursoProfesorService.postCursoProfesor(request));
    }





    // * OBTENER TODOS LOS CURSOS ACTIVOS*/
    @GetMapping("/allActive")
    public List<Curso> getCursosActivos() {
        return cursoService.getCursosActivos();
    }
    

    // * GUARDAR NUEVO CURSO */
/*     @PostMapping(value = "/curso/agregarCurso")
    public ResponseEntity<Object> postCurso(@RequestBody CursoRequest request) {
        return ResponseEntity.ok(cursoService.postCurso(request));
    } */

    // * ELIMINAR CURSO (DESCATALOGAR CURSO - STATUS = 0) */
    @PostMapping(value = "/curso/deleteCurso")
    public ResponseEntity<Object> delCurso(@RequestBody CursoRequest request) {
        return ResponseEntity.ok(cursoService.delCurso(request));
    }



}
