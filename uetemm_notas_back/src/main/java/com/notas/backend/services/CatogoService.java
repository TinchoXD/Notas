package com.notas.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.notas.backend.model.Catalogo;
import com.notas.backend.repository.CatalogoRepository;

@Service
public class CatogoService {

    @Autowired
    CatalogoRepository catalogoRepository;

    public List<Catalogo> getAllCatalogos(){
        List<Catalogo> resultList = catalogoRepository.findByCatalogoParent(null);
        return resultList;    
    }

    public List<Catalogo> getCatalogoByParentId(Integer catalogo_parent_id){
        List<Catalogo> resultList = catalogoRepository.findByCatalogoParent(catalogo_parent_id);
        return resultList;    
    }



}
