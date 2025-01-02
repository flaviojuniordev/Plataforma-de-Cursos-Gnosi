package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.controller.CreateLessonDto;
import com.example.gnosi.usergnosi.controller.CreateModuleDto;
import com.example.gnosi.usergnosi.controller.UpdateModuleDto;
import com.example.gnosi.usergnosi.entity.Lesson;
import com.example.gnosi.usergnosi.entity.Module;
import com.example.gnosi.usergnosi.repository.ModuleRepository;
import com.example.gnosi.usergnosi.repository.LessonRepository;
import org.springframework.stereotype.Service;
import com.example.gnosi.usergnosi.entity.Course;
import com.example.gnosi.usergnosi.repository.CourseRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;

    public ModuleService(ModuleRepository moduleRepository, CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.moduleRepository = moduleRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }

    public UUID createModule(CreateModuleDto createModuleDto) {
        Course course = courseRepository.findById(createModuleDto.courseId())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        Module module = new Module();
        module.setName(createModuleDto.name());
        module.setDescription(createModuleDto.description());
        module.setCourse(course);
        var savedModule = moduleRepository.save(module);

        if (createModuleDto.lessons() != null && !createModuleDto.lessons().isEmpty()) {
            for (CreateLessonDto lessonDto : createModuleDto.lessons()) {
                Lesson lesson = new Lesson();
                lesson.setTitle(lessonDto.title());
                lesson.setVideoLink(lessonDto.videoLink());
                lesson.setModule(savedModule);
                lessonRepository.save(lesson);
            }
        }

        return savedModule.getModuleId();
    }

    public Optional<Module> getModuleById(String moduleId) {
        if (!isValidUUID(moduleId)) {
            throw new IllegalArgumentException("ID de módulo inválido: " + moduleId);
        }
        return moduleRepository.findById(UUID.fromString(moduleId));
    }

    public List<Module> listModules() {
        return moduleRepository.findAll();
    }

    public void updateModuleById(String moduleId, UpdateModuleDto updateModuleDto) {
        if (!isValidUUID(moduleId)) {
            throw new IllegalArgumentException("ID de módulo inválido: " + moduleId);
        }

        Optional<Module> optionalModule = moduleRepository.findById(UUID.fromString(moduleId));
        if (optionalModule.isPresent()) {
            Module module = optionalModule.get();
            module.setName(updateModuleDto.name());
            module.setDescription(updateModuleDto.description());
            moduleRepository.save(module);
        } else {
            throw new RuntimeException("Módulo não encontrado");
        }
    }

    public void deleteModuleById(String moduleId) {
        if (!isValidUUID(moduleId)) {
            throw new IllegalArgumentException("ID de módulo inválido: " + moduleId);
        }

        if (!moduleRepository.existsById(UUID.fromString(moduleId))) {
            throw new IllegalArgumentException("Módulo não encontrado para deletar");
        }

        moduleRepository.deleteById(UUID.fromString(moduleId));
    }

    public boolean moduleExists(String moduleId) {
        if (!isValidUUID(moduleId)) {
            throw new IllegalArgumentException("ID de módulo inválido: " + moduleId);
        }
        return moduleRepository.existsById(UUID.fromString(moduleId));
    }

    private boolean isValidUUID(String uuidStr) {
        try {
            UUID.fromString(uuidStr);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
