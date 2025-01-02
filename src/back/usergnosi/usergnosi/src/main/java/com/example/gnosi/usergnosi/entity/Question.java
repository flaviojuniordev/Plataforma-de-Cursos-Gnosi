// Question.java
package com.example.gnosi.usergnosi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "tb_question")
public class Question {

    @Id
    @GeneratedValue
    @Column(name = "question_id")
    private UUID questionId;

    @Column(name = "question_text", nullable = false)
    private String questionText;

    @Column(name = "answer_1", nullable = false)
    private String answer1;

    @Column(name = "answer_2", nullable = false)
    private String answer2;

    @Column(name = "answer_3", nullable = false)
    private String answer3;

    @Column(name = "answer_4", nullable = false)
    private String answer4;

    @Column(name = "correct_answer", nullable = false)
    private int correctAnswer;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    @JsonBackReference
    private Quiz quiz;

    public Question() {}

    public Question(String questionText, String answer1, String answer2, String answer3, String answer4, int correctAnswer, Quiz quiz) {
        this.questionText = questionText;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer;
        this.quiz = quiz;
    }

    public UUID getQuestionId() {
        return questionId;
    }

    public void setQuestionId(UUID questionId) {
        this.questionId = questionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }

    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }

    public String getAnswer3() {
        return answer3;
    }

    public void setAnswer3(String answer3) {
        this.answer3 = answer3;
    }

    public String getAnswer4() {
        return answer4;
    }

    public void setAnswer4(String answer4) {
        this.answer4 = answer4;
    }

    public int getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(int correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}