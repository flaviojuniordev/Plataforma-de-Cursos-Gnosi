package com.example.gnosi.usergnosi.controller;

public record UpdateCourseDto(
        String name,
        String description,
        byte[] imagePath,
        String category
) {}