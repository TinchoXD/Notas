package com.notas.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.notas.backend.dto.UserDTO;
import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Role;
import com.notas.backend.model.User;
import com.notas.backend.repository.UserRepository;
import com.notas.backend.request.PasswordRequest;
import com.notas.backend.request.UserRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserDTO buscarPersona(int id) {

        User user = userRepository.findById(id).orElse(null);
        try {
            user.getUser_grupo_etnico_otro();
            
        } catch (Exception e) {
          user.setUser_grupo_etnico_otro(new Catalogo()); Verificar construccion del objeto cuando un campo es null
        }

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getUsername(),
                1,
                user.getPais(),
                user.getEstado_civil(),
                user.getUser_relacion_laboral(),
                user.getUser_jornada_laboral(),
                user.getUser_categoria(),
                user.getUser_grupo_etnico(),
                user.getUser_grupo_etnico_otro(),
                user.getUser_nivel_educacion(),
                user.getUser_estado_usuario(),
                user.getUser_direccion(),
                user.getUser_telefono_celular(),
                user.getUser_telefono_convencional(),
                user.getUser_email_personal(),
                user.getUser_email_institucional(),
                user.getUser_distrito());

        return userDTO;
    }

    /*
     * public User actualizarPersona(User user) {
     * try {
     * Optional<User> userUpdate = userRepository.findById(user.id);
     * User user2 = userUpdate.get();
     * user2.setFirstname(user.firstname);
     * user2.setLastname(user.lastname);
     * return userRepository.save(user2);
     * 
     * } catch (Exception e) {
     * e.printStackTrace();
     * return null;
     * }
     * }
     */

    @Transactional
    public MessageResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .id(userRequest.id)
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.lastname)
                .pais(userRequest.pais)
                .role(Role.USER)
                .estado_civil(userRequest.estadoCivil)
                .user_direccion(userRequest.user_direccion)
                .user_telefono_celular(userRequest.user_telefono_celular)
                .user_telefono_convencional(userRequest.user_telefono_convencional)
                .user_email_personal(userRequest.user_email_personal)
                .user_email_institucional(userRequest.user_email_institucional)
                .user_distrito(userRequest.user_distrito)
                .user_relacion_laboral(userRequest.user_relacion_laboral)
                .user_jornada_laboral(userRequest.user_jornada_laboral)
                .user_status(userRequest.user_status)
                .build();

        userRepository.updateUser(
                user.id,
                user.firstname,
                user.lastname,
                user.pais,
                user.estado_civil,
                user.user_direccion,
                user.user_telefono_celular,
                user.user_telefono_convencional,
                user.user_email_personal,
                user.user_email_institucional,
                user.user_distrito,
                user.user_status,
                user.user_relacion_laboral,
                user.user_jornada_laboral,
                user.user_categoria,
                user.user_grupo_etnico,
                user.user_grupo_etnico_otro,
                user.user_nivel_educacion,
                user.user_estado_usuario);

        return new MessageResponse("El usuario se actualizó satisfactoriamente.");
    }

    @Transactional
    public MessageResponse updatePassword(PasswordRequest passwordRequest) {

        User user = User.builder()
                .id(passwordRequest.id)
                .password(passwordEncoder.encode(passwordRequest.getPassword()))
                .build();

        userRepository.updatePassword(user.id, user.password);

        return new MessageResponse("La contraseña se ha actualizado Correctamente.");
    }

}
