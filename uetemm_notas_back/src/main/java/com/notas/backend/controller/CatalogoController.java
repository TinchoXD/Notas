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

import com.notas.backend.request.CatalogoRequest;
import com.notas.backend.services.CatogoService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/catalogos")
@RequiredArgsConstructor
@CrossOrigin(origins = { "*" })
/* @CrossOrigin(origins = { "http://localhost:4600" }) */
public class CatalogoController {

    @Autowired
    CatogoService catalogoService;

    
    @GetMapping("/all")
    public ResponseEntity<Object> getCatalogoList() {
        try {
            return ResponseEntity.ok(catalogoService.getAllCatalogos());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar Lista de Catálogos", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/estado_civil")
    public ResponseEntity<Object> getEstadoCivilList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(1));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Estado Civil", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/relacion_laboral")
    public ResponseEntity<Object> getRelacionLaboralList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(12));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Relacion Laboral", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/jornada_laboral")
    public ResponseEntity<Object> getJornadaboralList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(8));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Jornada Laboral", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/categoria")
    public ResponseEntity<Object> getCategoriaList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(16));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Categoria", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/nivel_educacion")
    public ResponseEntity<Object> getNivelEducacionList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(25));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Nivel Educacion", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/grupo_etnico")
    public ResponseEntity<Object> getGrupoEtnicoList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(31));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Grupo etnico", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/nacionalidad_indigena")
    public ResponseEntity<Object> getGrupoEtnicoOtroList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(39));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Nacionalidad Indigena", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/actividad_laboral")
    public ResponseEntity<Object> getActividadLaboralList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(68));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Actividad Laboral", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/nivel")
    public ResponseEntity<Object> getNivelList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(72));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Nivel", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/sexo")
    public ResponseEntity<Object> getSexoList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(80));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Sexo", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/nivelAsignatura")
    public ResponseEntity<Object> getNivelAsignaturaList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(122));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - NivelAsignatura", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/subNivelAsignatura")
    public ResponseEntity<Object> getSubNivelAsignaturaList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(98));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - SubNivelAsignatura", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/grado")
    public ResponseEntity<Object> getGradosList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(87));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Grado", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/paralelo")
    public ResponseEntity<Object> getParaleloList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(103));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Paralelo", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/asignatura")
    public ResponseEntity<Object> getAsignaturaList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(113));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Asignatura", HttpStatus.BAD_REQUEST);
            }
    }
    @PostMapping(value = "/agregarAsignatura")
    public ResponseEntity<Object> postAsignatura(@RequestBody CatalogoRequest request) {
        try {
            return ResponseEntity.ok(catalogoService.postAsignatura(request));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al agregar - Asignatura", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/asignaturaActive")
    public ResponseEntity<Object> getAsignaturaActiveList() {
        try {
            return ResponseEntity.ok(catalogoService.getAsignaturasActivas());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Asignatura", HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/jornada")
    public ResponseEntity<Object> getJornadaList() {
        try {
            return ResponseEntity.ok(catalogoService.getCatalogoByParentId(118));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("error al consultar catálogo - Jornada", HttpStatus.BAD_REQUEST);
            }
    }



    
    /*
     * @GetMapping("/estado-civil")
     * public UserDTO getEstadoCivil() {
     * return userService.buscarPersona();
     * }
     */

}
