package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.entity.Question;
import com.example.gnosi.usergnosi.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(UUID questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Pergunta não encontrada com ID: " + questionId));
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(UUID questionId, Question updatedQuestion) {
        Question question = getQuestionById(questionId);
        question.setQuestionText(updatedQuestion.getQuestionText());
        question.setAnswer1(updatedQuestion.getAnswer1());
        question.setAnswer2(updatedQuestion.getAnswer2());
        question.setAnswer3(updatedQuestion.getAnswer3());
        question.setAnswer4(updatedQuestion.getAnswer4());
        question.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
        return questionRepository.save(question);
    }

    public void deleteQuestion(UUID questionId) {
        questionRepository.deleteById(questionId);
    }
}
