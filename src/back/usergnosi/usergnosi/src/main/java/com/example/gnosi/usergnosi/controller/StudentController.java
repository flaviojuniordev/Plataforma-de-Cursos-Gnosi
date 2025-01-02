package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.User;
import com.example.gnosi.usergnosi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final UserService userService;

    public StudentController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Void> createStudent(@RequestBody CreateUserDto createUserDto) {
        if (!"STUDENT".equalsIgnoreCase(createUserDto.userType())) {
            return ResponseEntity.badRequest().build();
        }
        userService.createUser(createUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<User>> listStudents() {
        var students = userService.listUsersByType("STUDENT");
        return ResponseEntity.ok(students);
    }
}

