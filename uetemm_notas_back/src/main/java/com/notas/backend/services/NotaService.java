package com.notas.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Curso;
import com.notas.backend.model.Nota;
import com.notas.backend.model.User;
import com.notas.backend.repository.CatalogoRepository;
import com.notas.backend.repository.NotaRepository;
import com.notas.backend.request.CatalogoRequest;
import com.notas.backend.request.CursoRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class NotaService {

    @Autowired
    CatalogoRepository catalogoRepository;

    @Autowired
    NotaRepository notaRepository;

    public List<Nota> getAllNotas() {
        List<Nota> resultList = notaRepository.findAll();
        return resultList;
    }

    public List<Nota> getNotasByEstudianteId(int estu_id) {
        List<Nota> resuList = notaRepository.findByEstudianteId(estu_id);
        return resuList;
    }
    public List<Nota> getNotasByCursoProfesorId(int cupr_id) {
        List<Nota> resuList = notaRepository.findByCursoProfesorId(cupr_id);
        return resuList;
    }
    public List<Nota> getNotasByEstudianteIdAndCursoProfesorId(int estu_id, int cupr_id) {
        List<Nota> resuList = notaRepository.findByEstudianteIdAndCursoProfesorId(estu_id, cupr_id);
        return resuList;
    }

    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓
    // !BORRAR ↓↓↓↓

    public List<Catalogo> getAllCatalogos() {
        List<Catalogo> resultList = catalogoRepository.findByCatalogoParent(null);
        return resultList;
    }

    public List<Catalogo> getCatalogoByParentId(Integer catalogo_parent_id) {
        List<Catalogo> resultList = catalogoRepository.findByCatalogoParent(catalogo_parent_id);
        return resultList;
    }

    public List<Catalogo> getAsignaturasActivas() {
        List<Catalogo> cursos = catalogoRepository.findByCatalogoParentAndStatus(113, 1);
        return cursos;
    }

    @Transactional
    public MessageResponse postAsignatura(CatalogoRequest catalogoRequest) {

        int catalogoDeAsignaturas = 113;

        /* if (catalogoRequest.id != 0) { */
        Catalogo asignatura = Catalogo.builder().id(catalogoRequest.id).nombre(catalogoRequest.nombre)
                .catalogoParent(catalogoDeAsignaturas).status(1).build();
        catalogoRepository.save(asignatura);
        /*
         * } else {
         * Catalogo asignatura =
         * Catalogo.builder().id(catalogoRequest.id).nombre(catalogoRequest.nombre).
         * catalogoParent(catalogoDeAsignaturas).status(1).build();
         * catalogoRepository.save(asignatura);
         */

        /* } */

        return new MessageResponse("El Curso se agregó satisfactoriamente.");
    }

}
