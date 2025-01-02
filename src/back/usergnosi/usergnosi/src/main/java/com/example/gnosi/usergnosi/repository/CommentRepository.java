package com.example.gnosi.usergnosi.repository;

import java.util.List;
import java.util.UUID;

import com.example.gnosi.usergnosi.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByCourse_CourseId(UUID courseId);

}
