package com.notas.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Estudiante;
import com.notas.backend.repository.EstudianteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstudianteService {
    
    @Autowired
    EstudianteRepository estudianteRepository;

    public List<Estudiante> getAllEstudiantes(){
        return estudianteRepository.findAll();
    }

    public List<Estudiante> getEstudiantesByCurso(int curso_id){
        return estudianteRepository.findByCursoId(curso_id);
        
    }

}
