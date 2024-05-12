package com.irojas.demojwt.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.irojas.demojwt.dto.UserDTO;
import com.irojas.demojwt.model.Role;
import com.irojas.demojwt.model.User;
import com.irojas.demojwt.repository.UserRepository;
import com.irojas.demojwt.request.PasswordRequest;
import com.irojas.demojwt.request.UserRequest;
import com.irojas.demojwt.response.MessageResponse;

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
        UserDTO UserDTO = new UserDTO(user.getId(), user.getFirstname(), user.getLastname(), user.getUsername(), 1,
                user.getCountry());
        return UserDTO;
    }

    public User actualizarPersona(User user) {
        try {
            Optional<User> userUpdate = userRepository.findById(user.id);
            User user2 = userUpdate.get();
            user2.setFirstname(user.firstname);
            user2.setLastname(user.lastname);
            return userRepository.save(user2);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public MessageResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .id(userRequest.id)
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.lastname)
                .country(userRequest.getCountry())
                .role(Role.USER)
                .build();

        userRepository.updateUser(user.id, user.firstname, user.lastname, user.country);

        return new MessageResponse("El usuario se actualizó satisfactoriamente.");
    }

    @Transactional
    public MessageResponse updatePassword(PasswordRequest passwordRequest) {

        User user = User.builder()
                .id(passwordRequest.id)
                .password(passwordEncoder.encode( passwordRequest.getPassword()))
                .build();

        userRepository.updateUser(user.id, user.firstname, user.lastname, user.country);

        return new MessageResponse("La contraseña se ha actualizado Correctamente.");
    }

}
