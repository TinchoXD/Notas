package com.notas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.Config;
import com.notas.backend.model.ConfiguracionFechas;


public interface ConfigRepository extends JpaRepository<Config,Integer> {


    Config findByKey(String nombreTipo);

}
