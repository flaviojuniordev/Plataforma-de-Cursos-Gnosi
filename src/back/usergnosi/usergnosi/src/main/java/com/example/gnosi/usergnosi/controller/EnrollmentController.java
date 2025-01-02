package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.service.EnrollmentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollStudent(@RequestParam UUID courseId, HttpServletRequest request) {
        try {
            enrollmentService.enrollStudentInCourse(courseId, request);
            return ResponseEntity.ok("Aluno inscrito no curso com sucesso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/courses")
    public ResponseEntity<?> listCoursesForStudent(HttpServletRequest request) {
        try {
            return ResponseEntity.ok(enrollmentService.listCoursesForStudent(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{courseId}/students")
    public ResponseEntity<?> listStudentsInCourse(@PathVariable UUID courseId) {
        try {
            return ResponseEntity.ok(enrollmentService.listStudentsInCourse(courseId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/{courseId}/enrolled")
    public ResponseEntity<String> checkIfStudentIsEnrolled(@PathVariable UUID courseId, HttpServletRequest request) {
        try {
            enrollmentService.isStudentEnrolledInCourse(courseId, request);
            return ResponseEntity.ok("Aluno já está inscrito neste curso.");
        } catch (IllegalArgumentException e) {
            String customMessage = "Erro: O aluno não está inscrito neste curso.";
            return ResponseEntity.status(404).body(customMessage);
        }
    }
}
