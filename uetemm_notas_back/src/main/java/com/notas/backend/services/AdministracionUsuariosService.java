package com.notas.backend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.dto.UserDTO;
import com.notas.backend.model.User;
import com.notas.backend.repository.AdministracionUsuariosRepository;


@Service
public class AdministracionUsuariosService {

    @Autowired
    AdministracionUsuariosRepository administracionUsuariosRepository;


    public List<UserDTO> getAllUsers() {

        List<UserDTO> resultList = new ArrayList<>();
        
        try {

            List<User> userList = administracionUsuariosRepository.findAll();

            for (User user : userList) {

                Integer estadoCivil;
                Integer relacionLaboral;
                Integer jornadaLaboral;
                Integer categoria;
                Integer grupoEtnico;
                Integer grupoEtnicoOtro;
                Integer nivelEducacion;

                try {
                    estadoCivil = user.getEstado_civil().getId();
                } catch (Exception e) {
                    estadoCivil = null;
                }
                try {
                    relacionLaboral = user.getUser_relacion_laboral().getId();
                } catch (Exception e) {
                    relacionLaboral = null;
                }
                try {
                    jornadaLaboral = user.getUser_jornada_laboral().getId();
                } catch (Exception e) {
                    jornadaLaboral = null;
                }
                try {
                    categoria = user.getUser_categoria().getId();
                } catch (Exception e) {
                    categoria = null;
                }
                try {
                    grupoEtnico = user.getUser_grupo_etnico().getId();
                } catch (Exception e) {
                    grupoEtnico = null;
                }
                try {
                    grupoEtnicoOtro = user.getUser_grupo_etnico_otro().getId();
                } catch (Exception e) {
                    grupoEtnicoOtro = null;
                }
                try {
                    nivelEducacion = user.getUser_nivel_educacion().getId();
                } catch (Exception e) {
                    nivelEducacion = null;
                }

                UserDTO userDTO = new UserDTO(
                        user.getId(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getUsername(),
                        user.getRole().name().equals("ADMIN")?1:2,
                        user.getPais(),
                        estadoCivil,
                        relacionLaboral,
                        jornadaLaboral,
                        categoria,
                        grupoEtnico,
                        grupoEtnicoOtro,
                        nivelEducacion,
                        user.getUser_estado_usuario(),
                        user.getUser_direccion(),
                        user.getUser_telefono_celular(),
                        user.getUser_telefono_convencional(),
                        user.getUser_email_personal(),
                        user.getUser_email_institucional(),
                        user.getUser_distrito(),
                        user.getUser_fecha_nacimiento(),
                        user.getUser_titulo_senescyt(),
                        user.getUser_especialidad_accion_personal());

                resultList.add(userDTO);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    

         System.out.println("");
        return resultList;
    }

}
