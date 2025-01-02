package com.example.gnosi.usergnosi.repository;

import com.example.gnosi.usergnosi.entity.Course;
import com.example.gnosi.usergnosi.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findByTeacher(Teacher teacher);
}
