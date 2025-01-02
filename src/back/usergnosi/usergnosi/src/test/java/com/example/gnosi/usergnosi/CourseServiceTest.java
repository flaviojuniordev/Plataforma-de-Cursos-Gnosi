//package com.example.gnosi.usergnosi;
//
//import com.example.gnosi.usergnosi.entity.Course;
//import com.example.gnosi.usergnosi.repository.CourseRepository;
//import com.example.gnosi.usergnosi.controller.CreateCourseDto;
//import com.example.gnosi.usergnosi.service.CourseService;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class CourseServiceTest {
//
//    private final CourseRepository courseRepository = Mockito.mock(CourseRepository.class);
//    private final CourseService courseService = new CourseService(courseRepository);
//
//    @Test
//    public void testCreateCourse_Success() {
//        CreateCourseDto createCourseDto = new CreateCourseDto("Course 1", "Description", "imagePath", "category");
//
//        // Remover a atribuição manual do courseId
//        Course savedCourse = new Course();
//        savedCourse.setName(createCourseDto.name());
//        savedCourse.setDescription(createCourseDto.description());
//        savedCourse.setImagePath(createCourseDto.imagePath());
//        savedCourse.setCategory(createCourseDto.category());
//
//        // Criar um UUID para o curso salvo
//        savedCourse.setCourseId(UUID.randomUUID());
//
//        when(courseRepository.save(any(Course.class))).thenReturn(savedCourse);
//
//        // Chama o método de criação de curso
//        UUID courseId = courseService.createCourse(createCourseDto);
//
//        assertNotNull(courseId);
//        assertEquals(savedCourse.getCourseId(), courseId);
//        verify(courseRepository, times(1)).save(any(Course.class));
//    }
//
//    @Test
//    public void testGetCourseById_Success() {
//        UUID courseId = UUID.randomUUID();
//        Course course = new Course();
//        course.setCourseId(courseId); // Agora definindo o courseId corretamente
//        course.setName("Course 1");
//        course.setDescription("Description");
//        course.setImagePath("imagePath");
//        course.setCategory("category");
//
//        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
//
//        Optional<Course> foundCourse = courseService.getCourseById(courseId.toString());
//
//        assertTrue(foundCourse.isPresent());
//        assertEquals(courseId, foundCourse.get().getCourseId());
//    }
//
//    @Test
//    public void testGetCourseById_NotFound() {
//        UUID courseId = UUID.randomUUID();
//
//        when(courseRepository.findById(courseId)).thenReturn(Optional.empty());
//
//        Optional<Course> foundCourse = courseService.getCourseById(courseId.toString());
//
//        assertFalse(foundCourse.isPresent());
//    }
//
//    @Test
//    public void testDeleteCourseById_Success() {
//        UUID courseId = UUID.randomUUID();
//
//        when(courseRepository.existsById(courseId)).thenReturn(true);
//
//        courseService.deleteCourseById(courseId.toString());
//
//        verify(courseRepository, times(1)).deleteById(courseId);
//    }
//
//    @Test
//    public void testDeleteCourseById_NotFound() {
//        UUID courseId = UUID.randomUUID();
//
//        when(courseRepository.existsById(courseId)).thenReturn(false);
//
//        assertThrows(IllegalArgumentException.class, () -> {
//            courseService.deleteCourseById(courseId.toString());
//        });
//    }
//}
