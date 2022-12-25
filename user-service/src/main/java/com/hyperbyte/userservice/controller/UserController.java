package com.hyperbyte.userservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hyperbyte.userservice.model.User;
import com.hyperbyte.userservice.service.UserService;
import com.hyperbyte.userservice.util.JwtUtils;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/users-service/api/v1")
public class UserController {
    
    @Autowired
    UserService userService;

    @PostMapping("/createUser")
    public User registerNewUser(@RequestBody User user) throws Exception {
        User dbUser = userService.registerNewUser(user);
        dbUser.setPassword(null);
        return dbUser;
    }

    @GetMapping("/getUserById")
    public User getUserById(@RequestParam("id") UUID id) {
        User dbUser = userService.getUserById(id);
        dbUser.setPassword(null);
        return dbUser;
    }

    @PostMapping("/getUserById")
    public User getUserById(@RequestBody User user) {
        User dbUser = userService.getUserById(user.getId());
        dbUser.setPassword(null);
        return dbUser;
    }

    @GetMapping("/getUser")
    public User getUserByUsername(@RequestParam("username") String username) {
        User dbUser = userService.getUserByUsername(username);
        dbUser.setPassword(null);
        return dbUser;
    }

    @PostMapping("/getUser")
    public User getUserByUsername(@RequestBody User user) {
        User dbUser = userService.getUserByUsername(user.getUsername());
        dbUser.setPassword(null);
        return dbUser;
    }

    @PostMapping("/deleteUser")
    public void deleteUser(@RequestBody User user) {
        userService.deleteUser(user);
    }

    @PostMapping("/deleteUserByID")
    public void deleteUserByUUID(@RequestBody String uuid) {
        userService.deleteUser(uuid);
    }

    @PostMapping("/updateUser")
    public Mono<Map<String, Object>> updatUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User newUser = userService.updateUser(user);
        String newToken = JwtUtils.generateToken(newUser.getUsername());
        response.put("userObject", newUser);
        response.put("userToken", newToken);
        return Mono.just(response);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
