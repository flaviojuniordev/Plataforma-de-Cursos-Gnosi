package com.example.gnosi.usergnosi.repository;

import com.example.gnosi.usergnosi.entity.Course;
import com.example.gnosi.usergnosi.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ModuleRepository extends JpaRepository<Module, UUID> {
    List<Module> findByCourse(Course course); // Encontra todos os módulos associados a um curso
    void deleteByCourse(Course course);
}
