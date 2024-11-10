package com.notas.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.ConfiguracionFechas;
import com.notas.backend.model.Curso;
import com.notas.backend.model.CursoProfesor;
import com.notas.backend.model.User;
import com.notas.backend.repository.AdministracionUsuariosRepository;
import com.notas.backend.repository.ConfiguracionFechasRepository;
import com.notas.backend.request.ConfiguracionFechasRequest;
import com.notas.backend.request.CursoProfesorRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class ConfiguracionFechasService {

    @Autowired
    ConfiguracionFechasRepository configuracionFechasRepository;

    public List<ConfiguracionFechas> getAllFechas() {
        try {
            List<ConfiguracionFechas> resultList = new ArrayList<>();
            resultList = configuracionFechasRepository.findAll();
            return resultList;
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public MessageResponse guardarConfiguracionFechas(ConfiguracionFechasRequest[] configuracionFechasRequest) {

        System.out.println("");

        for (ConfiguracionFechasRequest configuracionFechasItem : configuracionFechasRequest) {
            ConfiguracionFechas configuracionFechas = configuracionFechasRepository
                    .findByTipo(configuracionFechasItem.fechaConfigTipo);

            configuracionFechas.setFechaInicio(configuracionFechasItem.getFechaConfigInicio());

            configuracionFechas.setFechaFin(configuracionFechasItem.getFechaConfigFin());

            configuracionFechasRepository.save(configuracionFechas);

        }

        return new MessageResponse("Se han actualizado los rangos de fechas para los aportes.");
    }

}
