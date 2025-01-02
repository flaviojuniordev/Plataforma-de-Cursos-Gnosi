package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.controller.CreateCourseDto;
import com.example.gnosi.usergnosi.controller.UpdateCourseDto;
import com.example.gnosi.usergnosi.controller.CreateModuleDto;
import com.example.gnosi.usergnosi.controller.CreateLessonDto;
import com.example.gnosi.usergnosi.entity.*;
import com.example.gnosi.usergnosi.entity.Module;
import com.example.gnosi.usergnosi.repository.CourseRepository;
import com.example.gnosi.usergnosi.repository.ModuleRepository;
import com.example.gnosi.usergnosi.repository.LessonRepository;
import com.example.gnosi.usergnosi.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, ModuleRepository moduleRepository, LessonRepository lessonRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
        this.lessonRepository = lessonRepository;
        this.userRepository =  userRepository;
    }

    public UUID createCourse(CreateCourseDto createCourseDto, HttpServletRequest request) {
        UUID userId = getUserIdFromSession(request);

        if (userId == null) {
            throw new IllegalArgumentException("Usuário não autorizado");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));

        if (user.getUserType() == null || !"TEACHER".equals(user.getUserType())) {
            throw new IllegalArgumentException("Somente professores podem criar cursos");
        }


        Teacher teacher = (Teacher) user;

        var course = new Course(
                null,
                createCourseDto.name(),
                createCourseDto.description(),
                createCourseDto.imagePath(),
                createCourseDto.category(),
                teacher
        );
        var savedCourse = courseRepository.save(course);

        if (createCourseDto.modules() != null && !createCourseDto.modules().isEmpty()) {
            for (CreateModuleDto moduleDto : createCourseDto.modules()) {
                Module module = new Module(moduleDto.name(), moduleDto.description(), savedCourse);
                var savedModule = moduleRepository.save(module);


                if (moduleDto.lessons() != null && !moduleDto.lessons().isEmpty()) {
                    for (CreateLessonDto lessonDto : moduleDto.lessons()) {
                        Lesson lesson = new Lesson(lessonDto.title(), lessonDto.videoLink(), savedModule);
                        lessonRepository.save(lesson);
                    }
                }
            }
        }

        return savedCourse.getCourseId();
    }

    public Optional<Course> getCourseById(String courseId) {
        if (!isValidUUID(courseId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + courseId);
        }
        return courseRepository.findById(UUID.fromString(courseId));
    }

    public List<Course> listCourses() {
        return courseRepository.findAll();
    }

    public List<Course> listCoursesByTeacher(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + userId));

        if (!"TEACHER".equals(user.getUserType())) {
            throw new IllegalArgumentException("Usuário não é um professor");
        }

        Teacher teacher = (Teacher) user;
        return courseRepository.findByTeacher(teacher);
    }

    public Optional<byte[]> getCourseImage(String courseId) {
        if (!isValidUUID(courseId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + courseId);
        }

        var courseEntity = courseRepository.findById(UUID.fromString(courseId));
        if (courseEntity.isPresent()) {
            var course = courseEntity.get();
            return Optional.ofNullable(course.getImagePath());
        }

        return Optional.empty();
    }

    public void updateCourseById(String courseId, UpdateCourseDto updateCourseDto, HttpServletRequest request) {
        if (!isValidUUID(courseId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + courseId);
        }

        UUID userId = getUserIdFromSession(request);
        if (userId == null) {
            throw new IllegalArgumentException("Usuário não autorizado");
        }

        UUID courseUuid = UUID.fromString(courseId);
        var courseEntity = courseRepository.findById(courseUuid);

        if (courseEntity.isPresent()) {
            var course = courseEntity.get();

            if (!course.getTeacher().getUserId().equals(userId)) {
                throw new IllegalArgumentException("Somente o professor que criou o curso pode atualizá-lo");
            }
            course.setName(updateCourseDto.name());
            course.setDescription(updateCourseDto.description());
            course.setImagePath(updateCourseDto.imagePath());
            course.setCategory(updateCourseDto.category());
            courseRepository.save(course);
        } else {
            throw new IllegalArgumentException("Course not found with id: " + courseId);
        }
    }

    @Transactional
    public void deleteCourseById(String courseId, HttpServletRequest request) {
        UUID userId = getUserIdFromSession(request);
        if (userId == null) {
            throw new IllegalArgumentException("Usuário não autorizado");
        }

        UUID courseUuid = UUID.fromString(courseId);
        var courseEntity = courseRepository.findById(courseUuid);

        if (courseEntity.isPresent()) {
            var course = courseEntity.get();

            if (!course.getTeacher().getUserId().equals(userId)) {
                throw new IllegalArgumentException("Somente o professor que criou o curso pode excluí-lo");
            }

            List<Module> modules = moduleRepository.findByCourse(course);
            for (Module module : modules) {
                lessonRepository.deleteByModule(module);
            }

            moduleRepository.deleteByCourse(course);
            courseRepository.delete(course);
        } else {
            throw new IllegalArgumentException("Curso não encontrado com ID: " + courseId);
        }
    }


    private boolean isValidUUID(String uuid) {
        try {
            UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public boolean courseExists(String courseId) {
        if (!isValidUUID(courseId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + courseId);
        }
        return courseRepository.existsById(UUID.fromString(courseId));
    }

    private UUID getUserIdFromSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("usuarioId") != null) {
            return (UUID) session.getAttribute("usuarioId");
        }
        throw new IllegalStateException("Usuário não autenticado ou sessão expirou.");
    }
}
