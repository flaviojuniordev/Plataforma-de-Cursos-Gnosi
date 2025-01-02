package com.example.gnosi.usergnosi.repository;

import com.example.gnosi.usergnosi.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, UUID> {
    List<Quiz> findByCourse_CourseId(UUID courseId);
}
