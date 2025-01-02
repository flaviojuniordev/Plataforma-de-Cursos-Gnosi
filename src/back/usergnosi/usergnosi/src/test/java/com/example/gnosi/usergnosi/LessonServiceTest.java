package com.example.gnosi.usergnosi;

import com.example.gnosi.usergnosi.controller.CreateLessonDto;
import com.example.gnosi.usergnosi.entity.Lesson;
import com.example.gnosi.usergnosi.service.LessonService;
import com.example.gnosi.usergnosi.entity.Module;
import com.example.gnosi.usergnosi.repository.LessonRepository;
import com.example.gnosi.usergnosi.repository.ModuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class LessonServiceTest {

    private LessonService lessonService;
    private LessonRepository lessonRepository;
    private ModuleRepository moduleRepository;

    @BeforeEach
    public void setUp() {
        lessonRepository = mock(LessonRepository.class);
        moduleRepository = mock(ModuleRepository.class);
        lessonService = new LessonService(lessonRepository, moduleRepository);
    }

    @Test
    public void testCreateLesson() {
        String moduleId = UUID.randomUUID().toString();
        CreateLessonDto createLessonDto = new CreateLessonDto("Lesson Title", "http://example.com/video", moduleId);

        Module module = new Module();
        module.setModuleId(UUID.fromString(moduleId));

        when(moduleRepository.findById(UUID.fromString(moduleId))).thenReturn(Optional.of(module));

        Lesson expectedLesson = new Lesson();
        expectedLesson.setLessonId(UUID.randomUUID());
        expectedLesson.setTitle(createLessonDto.title());
        expectedLesson.setVideoLink(createLessonDto.videoLink());
        expectedLesson.setModule(module);

        when(lessonRepository.save(any(Lesson.class))).thenReturn(expectedLesson);

        UUID createdLessonId = lessonService.createLesson(createLessonDto);

        assertNotNull(createdLessonId);
        assertEquals(expectedLesson.getLessonId(), createdLessonId);
        verify(lessonRepository, times(1)).save(any(Lesson.class));
    }

    @Test
    public void testCreateLesson_ModuleNotFound() {
        String moduleId = UUID.randomUUID().toString();
        CreateLessonDto createLessonDto = new CreateLessonDto("Lesson Title", "http://example.com/video", moduleId);
        when(moduleRepository.findById(UUID.fromString(moduleId))).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> lessonService.createLesson(createLessonDto));
        assertEquals("Módulo não encontrado", exception.getMessage());
    }
}
