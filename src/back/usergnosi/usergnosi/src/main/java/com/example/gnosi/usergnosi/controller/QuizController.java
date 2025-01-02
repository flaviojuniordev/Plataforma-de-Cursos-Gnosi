package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.Question;
import com.example.gnosi.usergnosi.entity.Quiz;
import com.example.gnosi.usergnosi.entity.QuizResult;
import com.example.gnosi.usergnosi.service.QuestionService;
import com.example.gnosi.usergnosi.service.QuizService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/quizzes")
public class QuizController {

    private final QuizService quizService;
    private final QuestionService questionService;

    public QuizController(QuizService quizService, QuestionService questionService) {
        this.quizService = quizService;
        this.questionService = questionService;
    }

    @PostMapping
    public UUID createQuiz(@RequestBody CreateQuizDto createQuizDto) {
        return quizService.createQuiz(createQuizDto);
    }

    @PostMapping("/{quizId}/questions")
    public ResponseEntity<List<Question>> addQuestionsToQuiz(
            @PathVariable String quizId,
            @RequestBody List<QuestionDto> questionDtos
    ) {
        UUID quizUuid = UUID.fromString(quizId);
        List<Question> questions = quizService.addQuestionsToQuiz(quizUuid, questionDtos);
        return ResponseEntity.status(HttpStatus.CREATED).body(questions);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Quiz>> getQuizzesByCourse(@PathVariable String courseId) {
        UUID courseUuid = UUID.fromString(courseId);
        List<Quiz> quizzes = quizService.getQuizzesByCourse(courseUuid);
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping("/questions")
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionDto questionDto) {
        Question question = new Question(
                questionDto.question(),
                questionDto.answer1(),
                questionDto.answer2(),
                questionDto.answer3(),
                questionDto.answer4(),
                questionDto.correctAnswer(),
                null
        );
        Question savedQuestion = questionService.createQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
    }

    @PostMapping("/{quizId}/results")
    public ResponseEntity<QuizResult> saveQuizResult(
            @PathVariable String quizId,
            @RequestBody SaveQuizResultDto saveQuizResultDto,
            HttpServletRequest request
    ) {
        UUID quizUuid = UUID.fromString(quizId);
        UUID courseUuid = saveQuizResultDto.getCourseId();

        QuizResult quizResult = quizService.saveQuizResult(
                courseUuid,
                quizUuid,
                saveQuizResultDto.getCorrectAnswers(),
                saveQuizResultDto.getTotalQuestions(),
                request
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(quizResult);
    }

    @GetMapping("/results/user")
    public ResponseEntity<List<QuizResult>> getQuizResultsByUserId(HttpServletRequest request) {
        List<QuizResult> quizResults = quizService.getQuizResultsByUserId(request);
        return ResponseEntity.ok(quizResults);
    }
}