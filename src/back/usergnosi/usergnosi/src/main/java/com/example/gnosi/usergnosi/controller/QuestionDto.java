package com.example.gnosi.usergnosi.controller;

import java.util.UUID;

public record QuestionDto(
        UUID quizId,
        String question,
        String answer1,
        String answer2,
        String answer3,
        String answer4,
        int correctAnswer
) {}
