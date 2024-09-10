package com.notas.backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.model.Curso;
import com.notas.backend.request.CursoRequest;
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
@RequestMapping("/api/cursos")
@RequiredArgsConstructor
@CrossOrigin(origins = { "*" })
/* @CrossOrigin(origins = { "http://localhost:4600" }) */
public class CursoController {

    @Autowired
    CursoService cursoService;

    // * OBTENER TODOS LOS CURSOS */
    @GetMapping("/all")
    public List<Curso> getCursos() {
        return cursoService.getCursos();
    }

    // * OBTENER TODOS LOS CURSOS ACTIVOS*/
    @GetMapping("/allActive")
    public List<Curso> getCursosActivos() {
        return cursoService.getCursosActivos();
    }

    // * OBTENER CURSO POR ID */
    @GetMapping("/curso/{id}")
    public Curso getCursoById(@PathVariable int id) {
        return cursoService.getCursoById(id);
    }

    // * OBTENER LOS POR ID DE USUARIO (TUTOR) */
    @GetMapping("/curso/user/{id}")
    public List<Curso> getCursoByUserId(@PathVariable int id) {
        return cursoService.getCursoByUserId(id);
    }


    // * VERIFICAR EXISTENCIA CURSO POR CÓDIGO */
    @GetMapping("/curso/codigo/{codigo}")
    public boolean getCursoByCodigo(@PathVariable String codigo) {
        return cursoService.getCursoByCodigo(codigo);
    }

    // * GUARDAR NUEVO CURSO */
    @PostMapping(value = "/curso/agregarCurso")
    public ResponseEntity<Object> postCurso(@RequestBody CursoRequest request) {
        return ResponseEntity.ok(cursoService.postCurso(request));
    }

    // * ACTUALIZAR CURSO */
    @PostMapping(value = "/curso/actualizarCurso")
    public ResponseEntity<Object> updateCurso(@RequestBody CursoRequest request) {
        return ResponseEntity.ok(cursoService.updateCurso(request));
    }

    // * ELIMINAR CURSO (DESCATALOGAR CURSO - STATUS = 0) */
    @PostMapping(value = "/curso/deleteCurso")
    public ResponseEntity<Object> delCurso(@RequestBody CursoRequest request) {
        return ResponseEntity.ok(cursoService.delCurso(request));
    }



    /*
     * @GetMapping("/user/verificarUsername/{username}")
     * public Boolean getMethodName(@PathVariable String username) {
     * return userService.verificarUsername(username);
     * }
     */

}
