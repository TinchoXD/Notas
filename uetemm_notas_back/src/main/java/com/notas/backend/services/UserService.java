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

        int roleId = 0;

        switch (user.role) {
            case ADMIN:
                roleId = 1;
                break;
        
            case USER:
                roleId = 2;
                break;
        
            case SECRETARIA:
                roleId = 3;
                break;
        
            default:
                break;
        }

        UserDTO userDTO = new UserDTO( 
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                sexo,
                user.getUsername(),
                roleId,
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

    public boolean verificarUsername(String username) {

        Optional<User> user = userRepository.findByUsername(username);

        if (!user.isEmpty()) {
            return true;
        }

        return false;
    }

    /*
     * public User actualizarPersona(User user) {
     * try {
     * Optional<User> userUpdate = userRepository.findById(user.id);
     * User user = userUpdate.get();
     * user.setFirstname(user.firstname);
     * user.setLastname(user.lastname);
     * return userRepository.save(user);
     * 
     * } catch (Exception e) {
     * e.printStackTrace();
     * return null;
     * }
     * }
     */

    @Transactional
    public MessageResponse updateUserByAdmin(UserRequest userRequest) {

        User user = userRepository.findUserById(userRequest.id);

        Role rol;
        switch (userRequest.getRol()) {
            case 1:
                rol = Role.ADMIN;
                break;
            case 2:
                rol = Role.USER;
                break;
            case 3:
                rol = Role.SECRETARIA;
                break;

            default:
                rol = Role.USER;
                break;
        }

        user.setFirstname(userRequest.getFirstname());
        user.setLastname(userRequest.getLastname());
        user.setUsername(userRequest.getUsername());
        user.setUser_estado_usuario(userRequest.isUser_estado_usuario() == true ? 1 : 0);

        user.setRole(rol);

        userRepository.save(user);

        return new MessageResponse("El usuario se actualizó satisfactoriamente.");
    }

    @Transactional
    public MessageResponse updateUser(UserRequest userRequest) {

        User user = userRepository.findUserById(userRequest.id);

        Catalogo catSexo = new Catalogo(userRequest.getUser_sexo(), "", null, null);
        Catalogo catEstadoCivil = new Catalogo(userRequest.getEstadoCivil(), "", null, null);
        Catalogo catRelacionLaboral = new Catalogo(userRequest.getUser_relacion_laboral(), "", null, null);
        Catalogo catJornadaLaboral = new Catalogo(userRequest.getUser_jornada_laboral(), "", null, null);
        Catalogo catCategoria = new Catalogo(userRequest.getUser_categoria(), "", null, null);
        Catalogo catGrupoEtnico = new Catalogo(userRequest.getUser_grupo_etnico(), "", null, null);
        Catalogo catNacionalidadIndigena = new Catalogo(0, "", null, null);
        try {
            catNacionalidadIndigena = new Catalogo(userRequest.getUser_nacionalidad_indigena(), "", null, null);
        } catch (Exception e) {
            catNacionalidadIndigena = null;
        }
        Catalogo catNivelEducacion = new Catalogo(userRequest.getUser_nivel_educacion(), "", null, null);
        Catalogo catActividadLaboral = new Catalogo(userRequest.getUser_actividad_laboral(), "", null, null);
        Catalogo catNivel = new Catalogo(userRequest.getUser_nivel(), "", null, null);

        user.firstname = userRequest.getFirstname();
        user.lastname = userRequest.lastname;
        user.user_sexo = catSexo;
        user.pais = userRequest.pais;
        /* user.role = Role.USER; */
        user.estado_civil = catEstadoCivil;
        user.user_direccion = userRequest.user_direccion;
        user.user_telefono_celular = userRequest.user_telefono_celular;
        user.user_telefono_convencional = userRequest.user_telefono_convencional;
        user.user_email_personal = userRequest.user_email_personal;
        user.user_email_institucional = userRequest.user_email_institucional;
        user.user_distrito = userRequest.user_distrito;
        user.user_relacion_laboral = catRelacionLaboral;
        user.user_jornada_laboral = catJornadaLaboral;
        user.user_categoria = catCategoria;
        user.user_grupo_etnico = catGrupoEtnico;
        user.user_nacionalidad_indigena = catNacionalidadIndigena;
        user.user_nivel_educacion = catNivelEducacion;
        user.user_status = userRequest.user_status;
        user.user_fecha_nacimiento = userRequest.user_fecha_nacimiento;
        user.user_titulo_senescyt = userRequest.user_titulo_senescyt;
        user.user_especialidad_accion_personal = userRequest.user_especialidad_accion_personal;
        user.user_actividad_laboral = catActividadLaboral;
        user.user_nivel = catNivel;
        user.user_fecha_ingreso_magisterio = userRequest.user_fecha_ingreso_magisterio;
        user.user_fecha_ingreso_institucion = userRequest.user_fecha_ingreso_institucion;

        userRepository.save(user);

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
