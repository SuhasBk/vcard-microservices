package com.hyperbyte.userservice.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hyperbyte.userservice.model.User;
import com.hyperbyte.userservice.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder encoder;

    public User registerNewUser(User user) throws Exception {
        if(userRepository.findByUsername(user.getUsername()).isEmpty()) {
            UUID uuid = UUID.randomUUID();
            user.setId(uuid);
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);
            log.info("Created new user: {}", user);
            return user;
        } else {
            log.error("Failed to create user. Username already exists: {}", user.getUsername());
            throw new Exception("Invalid Request. This username already exists, please use another.");
        }
    }

    public User getUserById(UUID id) {
        log.info("Inside getUserById. UUID: {}", id);
        return userRepository.findById(id).orElseThrow();
    }

    public User getUserByUsername(String username) {
        log.info("Inside getUserByUsername. Username: {}", username);
        return userRepository.findByUsername(username).orElseThrow();
    }

    public void deleteUser(User user) {
        log.info("Inside deleteUser. User: {}", user);
        userRepository.delete(user);
    }

    public void deleteUser(String uuid) {
        log.info("Inside deleteUser. UUID: {}", uuid);
        userRepository.deleteById(UUID.fromString(uuid));
    }

    public User updateUser(User user) throws NoSuchElementException {
        log.info("Inside updateUser. User Updated Details: {}", user);
        User currUser = getUserById(user.getId());
        log.info("Current DB user object: {}", currUser);
        if (currUser != null) {
            UUID uuid = UUID.randomUUID();
            user.setId(uuid);
            user.setUsername(currUser.getUsername());
            user.setPassword(encoder.encode(user.getPassword()));
            log.info("Inserting new user details with same username but new UUID: {}", user);
            user = userRepository.save(user);
            log.info("Deleting old user details: {}", currUser);
            deleteUser(currUser);
        }
        else {
            throw new NoSuchElementException("User not found!");
        }
        return user;
    }

    public List<User> getAllUsers() {
        log.info("Oh boy. Inside GET ALL USERS! Have fun.");
        return userRepository.findAll();
    }
}
