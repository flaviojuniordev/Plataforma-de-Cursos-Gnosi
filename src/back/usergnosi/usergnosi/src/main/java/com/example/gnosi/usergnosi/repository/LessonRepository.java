package com.example.gnosi.usergnosi.repository;

import com.example.gnosi.usergnosi.entity.Lesson;
import com.example.gnosi.usergnosi.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, UUID> {
    void deleteByModule(Module module);
}
