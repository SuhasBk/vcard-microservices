package com.hyperbyte.apigateway.model;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    UUID id;
    String name;
    String username;
    String password;
}
