package com.example.gnosi.usergnosi.repository;

import com.example.gnosi.usergnosi.entity.Enrollment;
import com.example.gnosi.usergnosi.entity.Student;
import com.example.gnosi.usergnosi.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);

    List<Enrollment> findByStudent(Student student);

    List<Enrollment> findByCourse(Course course);
}
