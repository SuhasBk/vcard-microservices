package com.hyperbyte.userservice.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hyperbyte.userservice.model.User;

public interface UserRepository extends MongoRepository<User, UUID> {
    Optional<User> findByUsername(String username);
}
