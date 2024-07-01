package com.notas.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.notas.backend.services.CatogoService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/catalogos")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200" })
public class CatalogoController {

    @Autowired
    CatogoService catalogoService;

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

    /*
     * @GetMapping("/estado-civil")
     * public UserDTO getEstadoCivil() {
     * return userService.buscarPersona();
     * }
     */

}
