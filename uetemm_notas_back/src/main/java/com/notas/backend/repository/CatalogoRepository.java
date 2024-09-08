package com.notas.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.notas.backend.model.Catalogo;


public interface CatalogoRepository extends JpaRepository<Catalogo,Integer> {

    List<Catalogo> findByCatalogoParent(Integer catalogoParent);

    List<Catalogo> findByCatalogoParentAndStatus(int catalogoParent, int status);



}
