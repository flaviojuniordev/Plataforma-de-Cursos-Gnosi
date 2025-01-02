package com.example.gnosi.usergnosi.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tb_enrollments")
public class Enrollment {

    @Id
    @GeneratedValue
    @Column(name = "enrollment_id")
    private UUID enrollmentId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonManagedReference
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonManagedReference
    private Course course;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;

    public Enrollment() {}

    public Enrollment(Student student, Course course, LocalDate enrollmentDate) {
        this.student = student;
        this.course = course;
        this.enrollmentDate = enrollmentDate;
    }

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }
}
