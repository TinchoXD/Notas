package com.notas.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Config;
import com.notas.backend.repository.ConfigRepository;
import com.notas.backend.request.ConfiguracionRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.transaction.Transactional;

@Service
public class ConfigService {

    @Autowired
    ConfigRepository configRepository;

    public List<Config> getAllConfig() {
        try {
            List<Config> resultList = new ArrayList<>();
            resultList = configRepository.findAll();
            return resultList;
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public MessageResponse guardarConfiguracion(ConfiguracionRequest[] configuracionRequest) {
        for (ConfiguracionRequest configuracionItem : configuracionRequest) {
            Config config = configRepository.findByKey(configuracionItem.key);
            config.setValue(configuracionItem.getValue());
            configRepository.save(config);
        }
        return new MessageResponse("Se han actualizado Las configuraciones generales.");
    }

}
