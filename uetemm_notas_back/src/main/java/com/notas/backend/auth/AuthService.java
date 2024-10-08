package com.notas.backend.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.notas.backend.jwt.JwtService;
import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Role;
import com.notas.backend.model.User;
import com.notas.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        if (user.getUser_estado_usuario() == null) {
            user.setUser_status(0);
        }
        if (user.getUser_estado_usuario() == 1) {
            return AuthResponse.builder()
                    .token(token)
                    .codigoStatus("200")
                    .mensaje("AuthResponse - Login: OK")
                    .build();
        } else if (user.getUser_estado_usuario() == 0) {
            return AuthResponse.builder()
                    .token(token)
                    .codigoStatus("403")
                    .mensaje("AuthResponse - Login: Prohibido")
                    .build();
        } else {
            return AuthResponse.builder()
                    .token(token)
                    .codigoStatus("500")
                    .mensaje("AuthResponse - Login: Error del servidor")
                    .build();
        }

    }

    public AuthResponse register(RegisterRequest request) {

        Role rol;
        switch (request.getRol()) {
            case 1:
                rol = Role.ADMIN;
                break;
            case 2:
                rol = Role.USER;
                break;

            default:
                rol = Role.USER;
                break;
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getUsername()))
                .firstname(request.getFirstname())
                .lastname(request.lastname)
                .user_email_personal(request.email)
                .role(rol)
                .user_requiere_cambio_contrasena(1)
                .build();

        /* userRepository.save(user); */


            userRepository.saveNewUser(user.getFirstname(),user.getLastname(),user.getUsername(), user.getPassword(),user.getUser_email_personal(), user.getRole().name());


        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .mensaje(null)
                .build();

    }


}
