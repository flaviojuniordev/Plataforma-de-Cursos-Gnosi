package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.Course;
import com.example.gnosi.usergnosi.service.CourseService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<UUID> createCourse(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("imagePath") MultipartFile imagePath,
            HttpServletRequest request) throws IOException {

        byte[] imageBytes = imagePath.getBytes();

        CreateCourseDto createCourseDto = new CreateCourseDto(
                name,
                description,
                imageBytes,
                category,
                null,
                null
        );

        UUID createdCourseId = courseService.createCourse(createCourseDto, request);

        return ResponseEntity.created(URI.create("/api/courses/" + createdCourseId)).body(createdCourseId);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> getCourseById(@PathVariable("courseId") String courseId) {
        var course = courseService.getCourseById(courseId);
        return course.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Course>> listCourses() {
        List<Course> courses = courseService.listCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/teacher/{userId}")
    public ResponseEntity<List<Course>> listCourses(@PathVariable("userId") UUID userId) {
        try {
            List<Course> courses = courseService.listCoursesByTeacher(userId);
            return ResponseEntity.ok(courses);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{courseId}/image")
    public ResponseEntity<byte[]> getCourseImage(@PathVariable("courseId") String courseId) {
        var image = courseService.getCourseImage(courseId);

        if (image.isPresent()) {
            byte[] imageBytes = image.get();

            if (isJPEG(imageBytes)) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);
                return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                        .body("Unsupported image type".getBytes());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Image not found".getBytes());
    }

    private boolean isJPEG(byte[] imageBytes) {
        return imageBytes[0] == (byte) 0xFF && imageBytes[1] == (byte) 0xD8;
    }


    @PutMapping("/{courseId}")
    public ResponseEntity<Void> updateCourseById(@PathVariable("courseId") String courseId,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("category") String category,
                                                 @RequestParam(value = "imagePath", required = false) MultipartFile imagePath,
                                                 HttpServletRequest request) throws IOException {

        if (!courseService.courseExists(courseId)) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageBytes = null;
        if (imagePath != null && !imagePath.isEmpty()) {
            imageBytes = imagePath.getBytes();
        }
        UpdateCourseDto updateCourseDto = new UpdateCourseDto(
                name,
                description,
                imageBytes,
                category
        );

        try {
            courseService.updateCourseById(courseId, updateCourseDto, request);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourseById(@PathVariable("courseId") String courseId,
                                                 HttpServletRequest request) {
        if (!courseService.courseExists(courseId)) {
            return ResponseEntity.notFound().build();
        }
        try {
            courseService.deleteCourseById(courseId, request);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}