package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.Question;
import com.example.gnosi.usergnosi.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable String questionId) {
        UUID questionUuid = UUID.fromString(questionId);
        Question question = questionService.getQuestionById(questionUuid);
        return ResponseEntity.ok(question);
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        Question savedQuestion = questionService.createQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable String questionId,
            @RequestBody Question updatedQuestion
    ) {
        UUID questionUuid = UUID.fromString(questionId);
        Question question = questionService.updateQuestion(questionUuid, updatedQuestion);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String questionId) {
        UUID questionUuid = UUID.fromString(questionId);
        questionService.deleteQuestion(questionUuid);
        return ResponseEntity.noContent().build();
    }
}
