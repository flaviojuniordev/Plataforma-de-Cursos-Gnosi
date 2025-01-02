// QuizResult.java
package com.example.gnosi.usergnosi.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "tb_quiz_results")
public class QuizResult {

    @Id
    @GeneratedValue
    @Column(name = "result_id")
    private UUID resultId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "course_id", nullable = false)
    private UUID courseId;

    @Column(name = "quiz_id", nullable = false)
    private UUID quizId;

    @Column(name = "correct_answers", nullable = false)
    private int correctAnswers;

    @Column(name = "total_questions", nullable = false)
    private int totalQuestions;

    // Getters and Setters
    public UUID getResultId() {
        return resultId;
    }

    public void setResultId(UUID resultId) {
        this.resultId = resultId;
    }

    public User getUser() {
        return user;
    }

    public void setUserId(User user) {
        this.user = user;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public void setCourseId(UUID courseId) {
        this.courseId = courseId;
    }

    public UUID getQuizId() {
        return quizId;
    }

    public void setQuizId(UUID quizId) {
        this.quizId = quizId;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
}