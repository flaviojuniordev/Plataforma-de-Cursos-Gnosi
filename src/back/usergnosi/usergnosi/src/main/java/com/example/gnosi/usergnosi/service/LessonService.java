package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.controller.CreateLessonDto;
import com.example.gnosi.usergnosi.entity.Lesson;
import com.example.gnosi.usergnosi.entity.Module;
import com.example.gnosi.usergnosi.repository.LessonRepository;
import com.example.gnosi.usergnosi.repository.ModuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;

    public LessonService(LessonRepository lessonRepository, ModuleRepository moduleRepository) {
        this.lessonRepository = lessonRepository;
        this.moduleRepository = moduleRepository;
    }

    public UUID createLesson(CreateLessonDto createLessonDto) {
        Optional<Module> optionalModule = moduleRepository.findById(UUID.fromString(createLessonDto.moduleId()));

        if (optionalModule.isPresent()) {
            Lesson lesson = new Lesson();
            lesson.setTitle(createLessonDto.title());
            lesson.setVideoLink(createLessonDto.videoLink());
            lesson.setModule(optionalModule.get());

            Lesson savedLesson = lessonRepository.save(lesson);
            return savedLesson.getLessonId();
        } else {
            throw new RuntimeException("Módulo não encontrado");
        }
    }


    public Optional<Lesson> getLessonById(String lessonId) {
        return lessonRepository.findById(UUID.fromString(lessonId));
    }

    public List<Lesson> listLessons() {
        return lessonRepository.findAll();
    }

    public void deleteLessonById(String lessonId) {
        if (!isValidUUID(lessonId)) {
            throw new IllegalArgumentException("ID de aula inválido: " + lessonId);
        }

        lessonRepository.deleteById(UUID.fromString(lessonId));
    }


    public boolean lessonExists(String lessonId) {
        return lessonRepository.existsById(UUID.fromString(lessonId));
    }

    private boolean isValidUUID(String uuid) {
        try {
            UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
