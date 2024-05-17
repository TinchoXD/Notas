package com.irojas.demojwt.Demo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.irojas.demojwt.dto.UserDTO;
import com.irojas.demojwt.model.User;
import com.irojas.demojwt.request.PasswordRequest;
import com.irojas.demojwt.request.UserRequest;
import com.irojas.demojwt.response.MessageResponse;
import com.irojas.demojwt.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.RequestEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = { "http://localhost:4200" })
public class DemoController {

    @Autowired
    UserService userService;

    @PostMapping(value = "/demo")
    public String welcome() {
        return "Welcome from secure endpoint";
    }

    @GetMapping("/test")
    public String getMethodName() {
        return "new String()";
    }

    @GetMapping("/user/{id}")
    public UserDTO getUserData(@PathVariable int id) {

        return userService.buscarPersona(id);
    }


    //* MÉTODO ALTERNATIVO PARA ACTUALIZAR USUARIO */
/*     @PutMapping(path = "/user")
    @ResponseBody
    public ResponseEntity<User> actualizarPersona(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.actualizarPersona(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }
    } */
    
    @PutMapping("/user")
    public ResponseEntity<MessageResponse> updateUser(@RequestBody UserRequest userRequest)
    {
        return ResponseEntity.ok(userService.updateUser(userRequest));
    }

    @PutMapping("/user/cambiarContrasena")
    public ResponseEntity<MessageResponse> updatePassword(@RequestBody PasswordRequest userRequest)
    { 
        return ResponseEntity.ok(userService.updatePassword(userRequest));
    }

}
