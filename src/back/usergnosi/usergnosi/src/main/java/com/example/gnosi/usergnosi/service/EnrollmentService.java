package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.entity.Course;
import com.example.gnosi.usergnosi.entity.User;
import com.example.gnosi.usergnosi.entity.Enrollment;
import com.example.gnosi.usergnosi.entity.Student;
import com.example.gnosi.usergnosi.repository.EnrollmentRepository;
import com.example.gnosi.usergnosi.repository.CourseRepository;
import com.example.gnosi.usergnosi.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, CourseRepository courseRepository, UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public UUID enrollStudentInCourse(UUID courseId, HttpServletRequest request) {
        UUID userId = getUserIdFromSession(request);

        if (userId == null) {
            throw new IllegalArgumentException("Usuário não autorizado");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));

        if (user.getUserType() == null || !"STUDENT".equals(user.getUserType())) {
            throw new IllegalArgumentException("Somente alunos podem se inscrever em cursos");
        }

        Student student = (Student) user;

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado com ID: " + courseId));

        enrollmentRepository.findByStudentAndCourse(student, course)
                .ifPresent(enrollment -> {
                    throw new IllegalArgumentException("O aluno já está inscrito neste curso.");
                });

        Enrollment enrollment = new Enrollment(student, course, LocalDate.now());
        enrollmentRepository.save(enrollment);
        return enrollment.getEnrollmentId();
    }


    public List<Student> listStudentsInCourse(UUID courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado com ID: " + courseId));

        List<Enrollment> enrollments = enrollmentRepository.findByCourse(course);
        return enrollments.stream()
                .map(Enrollment::getStudent)
                .toList();
    }

    public List<Course> listCoursesForStudent(HttpServletRequest request) {
        UUID userId = getUserIdFromSession(request);

        if (userId == null) {
            throw new IllegalArgumentException("Usuário não autenticado.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));

        if (user.getUserType() == null || !"STUDENT".equals(user.getUserType())) {
            throw new IllegalArgumentException("Somente alunos podem listar seus cursos");
        }

        Student student = (Student) user;

        List<Enrollment> enrollments = enrollmentRepository.findByStudent(student);
        return enrollments.stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toList());
    }

    private UUID getUserIdFromSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("usuarioId") != null) {
            return (UUID) session.getAttribute("usuarioId");
        }
        throw new IllegalStateException("Usuário não autenticado ou sessão expirou.");
    }

    public boolean isStudentEnrolledInCourse(UUID courseId, HttpServletRequest request) {
        UUID userId = getUserIdFromSession(request);

        if (userId == null) {
            throw new IllegalArgumentException("Usuário não autorizado");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));

        if (user.getUserType() == null || !"STUDENT".equals(user.getUserType())) {
            throw new IllegalArgumentException("Somente alunos podem verificar sua inscrição em cursos");
        }

        Student student = (Student) user;

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado com ID: " + courseId));

        Optional<Enrollment> enrollment = enrollmentRepository.findByStudentAndCourse(student, course);

        if (enrollment.isEmpty()) {
            throw new IllegalArgumentException("Aluno não está inscrito neste curso.");
        }

        return true;
    }
}
