package com.notas.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.notas.backend.model.Catalogo;
import com.notas.backend.repository.CatalogoRepository;

@Service
public class CatogoService {

    @Autowired
    CatalogoRepository catalogoRepository;

    public List<Catalogo> getAllCatalogos(){
        List<Catalogo> resultList = catalogoRepository.findByCatalogoParent(1);
        return resultList;    
    }

}
