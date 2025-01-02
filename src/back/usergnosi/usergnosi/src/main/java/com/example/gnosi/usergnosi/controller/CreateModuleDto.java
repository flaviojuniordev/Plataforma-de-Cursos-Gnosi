package com.example.gnosi.usergnosi.controller;

import java.util.UUID;
import java.util.List;

public record CreateModuleDto(
        String name,
        String description,
        UUID courseId,
        List<CreateLessonDto> lessons
) {}

