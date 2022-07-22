package com.hyperbyte.userservice.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hyperbyte.userservice.model.User;
import com.hyperbyte.userservice.service.UserService;
import com.hyperbyte.userservice.util.JwtUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/users-service/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        log.info("User trying to login: {}", user);
        User userFromDb = userService.getUserByUsername(user.getUsername());
        if(userFromDb != null && encoder.matches(user.getPassword(), userFromDb.getPassword())) {
            String token = JwtUtil.generateToken(userFromDb.getId());
            log.debug("Generated token: {}", token);
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }
        return new ResponseEntity<String>("Invalid Username/Password! Try Again!", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) throws Exception {
        log.info("New user trying to register: {}", user);
        User newUser = userService.registerNewUser(user);
        if(newUser != null) {
            String token = JwtUtil.generateToken(newUser.getId());
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }
        return new ResponseEntity<String>("Bad Request", HttpStatus.BAD_REQUEST);        
    }

    @GetMapping("/validateToken/{token}")
    public User validateToken(@PathVariable("token") String token) {
        try {
            JwtUtil.validateToken(token);
            UUID id = UUID.fromString(JwtUtil.getClaims(token).getSubject());
            return userService.getUserById(id);
        } catch (Exception e) {
            throw new RuntimeException("User Auth Failed!\n" + e);
        }
    }
}
