package com.hyperbyte.userservice.model;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("vcard_users")
public class User {
    @Id
    UUID id;
    String name;
    String username;
    String password;
    String email;
}
