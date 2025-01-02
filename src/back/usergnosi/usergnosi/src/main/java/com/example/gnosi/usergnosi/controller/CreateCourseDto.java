package com.example.gnosi.usergnosi.controller;

import java.util.List;
import java.util.UUID;

public record CreateCourseDto(
        String name,
        String description,
        byte[] imagePath,
        String category,
        List<CreateModuleDto> modules,
        UUID teacherId
) {}