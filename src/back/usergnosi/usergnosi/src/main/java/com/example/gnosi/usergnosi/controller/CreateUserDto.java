package com.example.gnosi.usergnosi.controller;

import java.time.Instant;

public record CreateUserDto(
        String firstName,
        String lastName,
        String email,
        String password,
        String userType,
        String cpf
) {}

