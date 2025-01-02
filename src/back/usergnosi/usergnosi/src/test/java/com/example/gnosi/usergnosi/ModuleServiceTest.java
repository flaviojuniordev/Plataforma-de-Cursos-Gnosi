//package com.example.gnosi.usergnosi;
//
//import com.example.gnosi.usergnosi.entity.Course;
//import com.example.gnosi.usergnosi.entity.Module;
//import com.example.gnosi.usergnosi.controller.CreateModuleDto;
//import com.example.gnosi.usergnosi.controller.UpdateModuleDto;
//import com.example.gnosi.usergnosi.repository.CourseRepository;
//import com.example.gnosi.usergnosi.repository.ModuleRepository;
//import com.example.gnosi.usergnosi.service.ModuleService;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class ModuleServiceTest {
//
//    private final ModuleRepository moduleRepository = Mockito.mock(ModuleRepository.class);
//    private final CourseRepository courseRepository = Mockito.mock(CourseRepository.class);
//    private final ModuleService moduleService = new ModuleService(moduleRepository, courseRepository);
//
//    @Test
//    public void testCreateModule_Success() {
//        UUID courseId = UUID.randomUUID();
//        CreateModuleDto createModuleDto = new CreateModuleDto("Module 1", "Description", courseId);
//
//        Course course = new Course(courseId, "Course 1", "Description", "imagePath", "category");
//
//        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
//
//        Module savedModule = new Module();
//        savedModule.setModuleId(UUID.randomUUID());
//        savedModule.setName(createModuleDto.name());
//        savedModule.setDescription(createModuleDto.description());
//        savedModule.setCourse(course);
//
//        when(moduleRepository.save(any(Module.class))).thenReturn(savedModule);
//
//        UUID moduleId = moduleService.createModule(createModuleDto);
//
//        assertNotNull(moduleId);
//        assertEquals(savedModule.getModuleId(), moduleId);
//        verify(moduleRepository, times(1)).save(any(Module.class));
//    }
//
//    @Test
//    public void testGetModuleById_Success() {
//        UUID moduleId = UUID.randomUUID();
//        Module module = new Module();
//        module.setModuleId(moduleId);
//        module.setName("Module 1");
//        module.setDescription("Description");
//
//        when(moduleRepository.findById(moduleId)).thenReturn(Optional.of(module));
//
//        Optional<Module> foundModule = moduleService.getModuleById(moduleId.toString());
//
//        assertTrue(foundModule.isPresent());
//        assertEquals(moduleId, foundModule.get().getModuleId());
//    }
//
//    @Test
//    public void testGetModuleById_NotFound() {
//        UUID moduleId = UUID.randomUUID();
//
//        when(moduleRepository.findById(moduleId)).thenReturn(Optional.empty());
//
//        Optional<Module> foundModule = moduleService.getModuleById(moduleId.toString());
//
//        assertFalse(foundModule.isPresent());
//    }
//
//    @Test
//    public void testUpdateModuleById_Success() {
//        UUID moduleId = UUID.randomUUID();
//        Module existingModule = new Module();
//        existingModule.setModuleId(moduleId);
//        existingModule.setName("Old Module");
//        existingModule.setDescription("Old Description");
//
//        UpdateModuleDto updateModuleDto = new UpdateModuleDto("Updated Module", "Updated Description");
//
//        when(moduleRepository.findById(moduleId)).thenReturn(Optional.of(existingModule));
//
//        moduleService.updateModuleById(moduleId.toString(), updateModuleDto);
//
//        assertEquals("Updated Module", existingModule.getName());
//        assertEquals("Updated Description", existingModule.getDescription());
//        verify(moduleRepository, times(1)).save(existingModule);
//    }
//
//    @Test
//    public void testDeleteModuleById_Success() {
//        UUID moduleId = UUID.randomUUID();
//
//        when(moduleRepository.existsById(moduleId)).thenReturn(true);
//
//        moduleService.deleteModuleById(moduleId.toString());
//
//        verify(moduleRepository, times(1)).deleteById(moduleId);
//    }
//
//    @Test
//    public void testDeleteModuleById_NotFound() {
//        UUID moduleId = UUID.randomUUID();
//
//        when(moduleRepository.existsById(moduleId)).thenReturn(false);
//
//        assertThrows(IllegalArgumentException.class, () -> {
//            moduleService.deleteModuleById(moduleId.toString());
//        });
//    }
//
//    @Test
//    public void testListModules_Success() {
//        Module module1 = new Module();
//        module1.setModuleId(UUID.randomUUID());
//        module1.setName("Module 1");
//        module1.setDescription("Description 1");
//
//        Module module2 = new Module();
//        module2.setModuleId(UUID.randomUUID());
//        module2.setName("Module 2");
//        module2.setDescription("Description 2");
//
//        when(moduleRepository.findAll()).thenReturn(List.of(module1, module2));
//
//        List<Module> modules = moduleService.listModules();
//
//        assertEquals(2, modules.size());
//    }
//}

