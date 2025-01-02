package com.example.gnosi.usergnosi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
@DiscriminatorValue("STUDENT")
public class Student extends User {

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Enrollment> enrollments;

    public Student() {
    }

    public Student(String firstName, String lastName, String email, String password, String cpf) {
        super(firstName, lastName, email, password, cpf);
    }

    public List<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<Enrollment> enrollments) {
        this.enrollments = enrollments;
    }
}

