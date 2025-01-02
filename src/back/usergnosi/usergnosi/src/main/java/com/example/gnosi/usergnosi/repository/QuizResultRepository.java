// QuizResultRepository.java
package com.example.gnosi.usergnosi.repository;

import com.example.gnosi.usergnosi.entity.QuizResult;
import com.example.gnosi.usergnosi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, UUID> {
    List<QuizResult> findByUser(User user);
}