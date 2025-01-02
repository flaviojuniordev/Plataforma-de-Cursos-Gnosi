package com.example.gnosi.usergnosi.controller;

public record CreateLessonDto(
        String title,
        String videoLink,
        String moduleId
) {}