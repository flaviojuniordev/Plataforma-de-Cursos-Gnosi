package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.Lesson;
import com.example.gnosi.usergnosi.service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/lessons")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping
    public ResponseEntity<Void> createLesson(@RequestBody CreateLessonDto createLessonDto) {
        UUID createdLessonId = lessonService.createLesson(createLessonDto);
        return ResponseEntity.created(URI.create("/lessons/" + createdLessonId.toString())).build();
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable("lessonId") String lessonId) {
        var lesson = lessonService.getLessonById(lessonId);
        return lesson.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> listLessons() {
        List<Lesson> lessons = lessonService.listLessons();
        return ResponseEntity.ok(lessons);
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<Void> deleteLessonById(@PathVariable("lessonId") String lessonId) {
        if (!lessonService.lessonExists(lessonId)) {
            return ResponseEntity.notFound().build();
        }
        lessonService.deleteLessonById(lessonId);
        return ResponseEntity.noContent().build();
    }
}
