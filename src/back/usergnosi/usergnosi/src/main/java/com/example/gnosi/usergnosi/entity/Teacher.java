package com.example.gnosi.usergnosi.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_teachers")
@DiscriminatorValue("TEACHER")
public class Teacher extends User {

    public Teacher() {
    }

    public Teacher(String firstName, String lastName, String email, String password, String cpf) {
        super(firstName, lastName, email, password, cpf);
    }
}
