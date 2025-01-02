package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.controller.CreateQuizDto;
import com.example.gnosi.usergnosi.controller.QuestionDto;
import com.example.gnosi.usergnosi.entity.*;
import com.example.gnosi.usergnosi.repository.CourseRepository;
import com.example.gnosi.usergnosi.repository.QuestionRepository;
import com.example.gnosi.usergnosi.repository.QuizRepository;
import com.example.gnosi.usergnosi.repository.QuizResultRepository;
import com.example.gnosi.usergnosi.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final CourseRepository courseRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;

    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository, CourseRepository courseRepository, QuizResultRepository quizResultRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.courseRepository = courseRepository;
        this.quizResultRepository = quizResultRepository;
        this.userRepository = userRepository;
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public UUID createQuiz(CreateQuizDto dto) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado"));

        Quiz quiz = new Quiz(dto.getTitle(), course);
        quiz = quizRepository.save(quiz);

        if (dto.getQuestions() != null) {
            for (QuestionDto questionDto : dto.getQuestions()) {
                Question question = new Question(
                        questionDto.question(),
                        questionDto.answer1(),
                        questionDto.answer2(),
                        questionDto.answer3(),
                        questionDto.answer4(),
                        questionDto.correctAnswer(),
                        quiz
                );
                questionRepository.save(question);
            }
        }

        return quiz.getQuizId();
    }

    public List<Quiz> getQuizzesByCourse(UUID courseId) {
        return quizRepository.findByCourse_CourseId(courseId);
    }

    public List<Question> addQuestionsToQuiz(UUID quizId, List<QuestionDto> questionDtos) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz não encontrado com ID: " + quizId));

        List<Question> questions = questionDtos.stream()
                .map(dto -> new Question(
                        dto.question(),
                        dto.answer1(),
                        dto.answer2(),
                        dto.answer3(),
                        dto.answer4(),
                        dto.correctAnswer(),
                        quiz
                ))
                .toList();

        return questionRepository.saveAll(questions);
    }

    public QuizResult saveQuizResult(UUID courseId, UUID quizId, int correctAnswers, int totalQuestions, HttpServletRequest request) {
        UUID userId = getUserIdFromSession(request);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        QuizResult quizResult = new QuizResult();
        quizResult.setUserId(user);
        quizResult.setCourseId(courseId);
        quizResult.setQuizId(quizId);
        quizResult.setCorrectAnswers(correctAnswers);
        quizResult.setTotalQuestions(totalQuestions);
        return quizResultRepository.save(quizResult);
    }

    public List<QuizResult> getQuizResultsByUserId(HttpServletRequest request) {
        UUID userId = getUserIdFromSession(request);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return quizResultRepository.findByUser(user);
    }

    private UUID getUserIdFromSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("usuarioId") != null) {
            return (UUID) session.getAttribute("usuarioId");
        }
        throw new IllegalStateException("Usuário não autenticado ou sessão expirou.");
    }
}