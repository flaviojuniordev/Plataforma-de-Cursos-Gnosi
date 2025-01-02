package com.example.gnosi.usergnosi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_courses")
public class Course {

    @Id
    @GeneratedValue
    @Column(name = "course_id")
    private UUID courseId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @Column(name = "image_path")
    private byte[] imagePath;

    @Column(name = "category", nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Module> modules;

    // Construtor padrão
    public Course() {}

    // Construtor com todos os campos
    public Course(UUID courseId, String name, String description, byte[] imagePath, String category, Teacher teacher) {
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.category = category;
        this.teacher = teacher;
    }

    // Getters e Setters
    public UUID getCourseId() {
        return courseId;
    }

    public void setCourseId(UUID courseId) {
        this.courseId = courseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImagePath() {
        return imagePath;
    }

    public void setImagePath(byte[] imagePath) {
        this.imagePath = imagePath;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
}