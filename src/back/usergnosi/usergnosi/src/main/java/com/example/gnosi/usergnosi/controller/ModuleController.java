package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.Module;
import com.example.gnosi.usergnosi.service.ModuleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/modules")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping
    public ResponseEntity<Void> createModule(@RequestBody CreateModuleDto createModuleDto) {
        UUID createdModuleId = moduleService.createModule(createModuleDto);
        return ResponseEntity.created(URI.create("/modules/" + createdModuleId.toString())).build();
    }

    @GetMapping("/{moduleId}")
    public ResponseEntity<Module> getModuleById(@PathVariable("moduleId") String moduleId) {
        var module = moduleService.getModuleById(moduleId);
        return module.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Module>> listModules() {
        List<Module> modules = moduleService.listModules();
        return ResponseEntity.ok(modules);
    }

    @PutMapping("/{moduleId}")
    public ResponseEntity<Void> updateModuleById(@PathVariable("moduleId") String moduleId,
                                                 @RequestBody UpdateModuleDto updateModuleDto) {
        if (!moduleService.moduleExists(moduleId)) {
            return ResponseEntity.notFound().build();
        }
        moduleService.updateModuleById(moduleId, updateModuleDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{moduleId}")
    public ResponseEntity<Void> deleteModuleById(@PathVariable("moduleId") String moduleId) {
        if (!moduleService.moduleExists(moduleId)) {
            return ResponseEntity.notFound().build();
        }
        moduleService.deleteModuleById(moduleId);
        return ResponseEntity.noContent().build();
    }
}
