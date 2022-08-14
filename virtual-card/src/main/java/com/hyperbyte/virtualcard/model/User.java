package com.hyperbyte.virtualcard.model;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    UUID id;
    String name;
    String username;
    String password;
    String email;
}
