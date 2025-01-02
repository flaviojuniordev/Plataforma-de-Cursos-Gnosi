package com.example.gnosi.usergnosi.controller;

import java.util.UUID;

public class CommentDto {
    private UUID courseId;
    private UUID parentCommentId;  // Adicionado para definir o comentário pai, se aplicável
    private String content;

    // Getters e Setters
    public UUID getCourseId() {
        return courseId;
    }

    public void setCourseId(UUID courseId) {
        this.courseId = courseId;
    }

    public UUID getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(UUID parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

