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

        // User user = userRepository.findById(id);
        User user = userRepository.findUserById(id);
        Integer sexo;
        Integer estadoCivil;
        Integer relacionLaboral;
        Integer jornadaLaboral;
        Integer categoria;
        Integer grupoEtnico;
        Integer nacionalidadIndigena;
        Integer nivelEducacion;
        Integer actividadLaboral;
        Integer nivel;
        Integer activo;

        try {
            sexo = user.user_sexo.getId();
        } catch (Exception e) {
            sexo = null;
        }
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
            nacionalidadIndigena = user.getUser_nacionalidad_indigena().getId();
        } catch (Exception e) {
            nacionalidadIndigena = null;
        }
        try {
            nivelEducacion = user.getUser_nivel_educacion().getId();
        } catch (Exception e) {
            nivelEducacion = null;
        }
        try {
            actividadLaboral = user.getUser_actividad_laboral().getId();
        } catch (Exception e) {
            actividadLaboral = null;
        }
        try {
            nivel = user.getUser_nivel().getId();
        } catch (Exception e) {
            nivel = null;
        }
        try {
            activo = user.getUser_activo().getId();
        } catch (Exception e) {
            activo = null;
        }


        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                sexo,
                user.getUsername(),
                1,
                user.getPais(),
                estadoCivil,
                relacionLaboral,
                jornadaLaboral,
                categoria,
                grupoEtnico,
                nacionalidadIndigena,
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
                user.getUser_especialidad_accion_personal(),
                actividadLaboral,
                nivel,
                activo,
                user.getUser_fecha_ingreso_magisterio(),
                user.user_fecha_ingreso_institucion,
                user.getUser_observacion());

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

        Catalogo catSexo = new Catalogo(userRequest.getUser_sexo(), "", null, null);
        Catalogo catEstadoCivil = new Catalogo(userRequest.getEstadoCivil(), "", null, null);
        Catalogo catRelacionLaboral = new Catalogo(userRequest.getUser_relacion_laboral(), "", null, null);
        Catalogo catJornadaLaboral = new Catalogo(userRequest.getUser_jornada_laboral(), "", null, null);
        Catalogo catCategoria = new Catalogo(userRequest.getUser_categoria(), "", null, null);
        Catalogo catGrupoEtnico = new Catalogo(userRequest.getUser_grupo_etnico(), "", null, null);
        Catalogo catNacionalidadIndigena = new Catalogo(userRequest.getUser_nacionalidad_indigena(), "", null, null);
        Catalogo catNivelEducacion = new Catalogo(userRequest.getUser_nivel_educacion(), "", null, null);
        
        Catalogo catActividadLaboral = new Catalogo(userRequest.getUser_actividad_laboral(), "", null, null);
        Catalogo catNivel = new Catalogo(userRequest.getUser_nivel(), "", null, null);

        User user = User.builder()
                .id(userRequest.id)
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.lastname)
                .user_sexo(catSexo)
                .pais(userRequest.pais)
                .role(Role.USER)
                .estado_civil(catEstadoCivil)
                .user_direccion(userRequest.user_direccion)
                .user_telefono_celular(userRequest.user_telefono_celular)
                .user_telefono_convencional(userRequest.user_telefono_convencional)
                .user_email_personal(userRequest.user_email_personal)
                .user_email_institucional(userRequest.user_email_institucional)
                .user_distrito(userRequest.user_distrito)
                .user_relacion_laboral(catRelacionLaboral)
                .user_jornada_laboral(catJornadaLaboral)
                .user_categoria(catCategoria)
                .user_grupo_etnico(catGrupoEtnico)
                .user_nacionalidad_indigena(catNacionalidadIndigena)
                .user_nivel_educacion(catNivelEducacion)
                .user_status(userRequest.user_status)
                .user_fecha_nacimiento(userRequest.user_fecha_nacimiento)
                .user_titulo_senescyt(userRequest.user_titulo_senescyt)
                .user_especialidad_accion_personal(userRequest.user_especialidad_accion_personal)
                .user_estado_usuario(userRequest.user_estado_usuario==true?1:0)
                .user_actividad_laboral(catActividadLaboral)
                .user_nivel(catNivel)
                .user_fecha_ingreso_magisterio(userRequest.user_fecha_ingreso_magisterio)
                .user_fecha_ingreso_institucion(userRequest.user_fecha_ingreso_institucion)
                .build();

        userRepository.updateUser(
                user.id,
                user.firstname,
                user.lastname,
                user.user_sexo,
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
                user.user_nacionalidad_indigena,
                user.user_nivel_educacion,
                user.user_estado_usuario,
                user.user_fecha_nacimiento,
                user.user_titulo_senescyt,
                user.user_especialidad_accion_personal,
                user.user_actividad_laboral,
                user.user_nivel,
                user.user_fecha_ingreso_magisterio,
                user.user_fecha_ingreso_institucion
                );

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

    @Transactional
    public MessageResponse resetPassword(PasswordRequest resetPasswordRequest) {

        User user = User.builder()
                .id(resetPasswordRequest.id)
                .password(passwordEncoder.encode(resetPasswordRequest.getPassword()))
                .build();

        userRepository.resetPassword(user.id, user.password, 1);

        return new MessageResponse("La contraseña se ha restablecido Correctamente.");
    }

}
