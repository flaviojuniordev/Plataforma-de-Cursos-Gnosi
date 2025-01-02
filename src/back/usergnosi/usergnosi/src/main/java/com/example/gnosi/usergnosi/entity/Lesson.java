package com.example.gnosi.usergnosi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "tb_lessons")
public class Lesson {

    @Id
    @GeneratedValue
    @Column(name = "lesson_id")
    private UUID lessonId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "video_link", nullable = false)
    private String videoLink;

    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false)
    @JsonBackReference
    private Module module;

    public Lesson() {}

    public Lesson(String title, String videoLink, Module module) {
        this.title = title;
        this.videoLink = videoLink;
        this.module = module;
    }

    public UUID getLessonId() {
        return lessonId;
    }

    public void setLessonId(UUID lessonId) {
        this.lessonId = lessonId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }
}
