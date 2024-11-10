package com.notas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.ConfiguracionFechas;
import com.notas.backend.model.CursoProfesor;

public interface ConfiguracionFechasRepository extends JpaRepository<ConfiguracionFechas,Integer> {


    ConfiguracionFechas findByTipo(String nombreTipo);

}
