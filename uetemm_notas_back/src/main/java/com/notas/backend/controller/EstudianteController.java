package com.notas.backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notas.backend.model.Curso;
import com.notas.backend.model.Estudiante;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.request.EstudianteRequest;
import com.notas.backend.request.EstudianteStatusRequest;
import com.notas.backend.request.UserRequest;
import com.notas.backend.response.MessageResponse;
import com.notas.backend.services.CursoService;
import com.notas.backend.services.EstudianteService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/estudiantes")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4600" })
public class EstudianteController {

    @Autowired
    EstudianteService estudianteService;

    @GetMapping("/all")
    public List<Estudiante> getEstudiantes() {
        return estudianteService.getAllEstudiantes();
    }

    @GetMapping("/estudiante/{id}")
    public Estudiante getEstudiantesById(@PathVariable int id) {
        return estudianteService.getEstudianteById(id);
    }

    @GetMapping("/estudiante/curso/{curso_id}")
    public List<Estudiante> getEstudiantesByCurso(@PathVariable int curso_id) {
        return estudianteService.getEstudiantesByCurso(curso_id);
    }

    @PutMapping("/estudiante")
    public ResponseEntity<MessageResponse> updateEstudiante(@RequestBody EstudianteRequest estudianteRequest)
    {
        return ResponseEntity.ok(estudianteService.updateEstudiante(estudianteRequest));  
    }

    @PutMapping("/estudiante/status")
    public ResponseEntity<MessageResponse> updateEstudianteStatus(@RequestBody EstudianteStatusRequest estudianteStatusRequest)
    {
        return ResponseEntity.ok(estudianteService.updateEstudianteStatus(estudianteStatusRequest));  
    }

    /*
     * @GetMapping("/allActive")
     * public List<Curso> getCursosActivos() {
     * return cursoService.getCursosActivos();
     * }
     * 
     * 
     * @GetMapping("/curso/user/{id}")
     * public List<Curso> getCursoByUserId(@PathVariable int id) {
     * return cursoService.getCursoByUserId(id);
     * }
     * 
     * 
     * @PostMapping(value = "/curso/agregarCurso")
     * public ResponseEntity<Object> postCurso(@RequestBody CursoRequest request)
     * {
     * return ResponseEntity.ok(cursoService.postCurso(request));
     * }
     * 
     * 
     * @PostMapping(value = "/curso/deleteCurso")
     * public ResponseEntity<Object> delCurso(@RequestBody CursoRequest request)
     * {
     * return ResponseEntity.ok(cursoService.delCurso(request));
     * }
     */
    /*
     * @GetMapping("/user/verificarUsername/{username}")
     * public Boolean getMethodName(@PathVariable String username) {
     * return userService.verificarUsername(username);
     * }
     */

}
