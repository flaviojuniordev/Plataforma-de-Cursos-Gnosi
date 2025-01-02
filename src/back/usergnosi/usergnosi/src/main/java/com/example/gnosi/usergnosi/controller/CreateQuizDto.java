// CreateQuizDto.java
package com.example.gnosi.usergnosi.controller;

import java.util.List;
import java.util.UUID;

public class CreateQuizDto {
    private String title;
    private UUID courseId;
    private List<QuestionDto> questions;

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public void setCourseId(UUID courseId) {
        this.courseId = courseId;
    }

    public List<QuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDto> questions) {
        this.questions = questions;
    }
}