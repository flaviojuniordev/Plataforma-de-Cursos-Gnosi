package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.User;
import com.example.gnosi.usergnosi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    private final UserService userService;

    public TeacherController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Void> createTeacher(@RequestBody CreateUserDto createUserDto) {
        if (!"TEACHER".equalsIgnoreCase(createUserDto.userType())) {
            return ResponseEntity.badRequest().build();
        }
        userService.createUser(createUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<User>> listTeachers() {
        var teachers = userService.listUsersByType("TEACHER");
        return ResponseEntity.ok(teachers);
    }
}

