package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.controller.CommentDto;
import com.example.gnosi.usergnosi.entity.Comment;
import com.example.gnosi.usergnosi.entity.Course;
import com.example.gnosi.usergnosi.entity.User;
import com.example.gnosi.usergnosi.repository.CommentRepository;
import com.example.gnosi.usergnosi.repository.CourseRepository;
import com.example.gnosi.usergnosi.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment saveComment(CommentDto commentDTO, HttpServletRequest request) {
        Course course = courseRepository.findById(commentDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        UUID userId = getUserIdFromSession(request);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Comment comment = new Comment();
        comment.setCourse(course);
        comment.setUser(user);
        comment.setContent(commentDTO.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        // Se houver um ID de comentário pai, associe-o
        if (commentDTO.getParentCommentId() != null) {
            Comment parentComment = commentRepository.findById(commentDTO.getParentCommentId())
                    .orElseThrow(() -> new RuntimeException("Comentário pai não encontrado"));
            comment.setParentComment(parentComment);
        }

        return commentRepository.save(comment);
    }


    // Método para buscar todos os comentários de um curso específico
    public List<Comment> getCommentsByCourseId(UUID courseId) {
        return commentRepository.findByCourse_CourseId(courseId);
    }

    // Método para excluir um comentário por ID
    public void deleteCommentById(UUID commentId, HttpServletRequest request) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            UUID userId = getUserIdFromSession(request);

            if (!comment.getUser().getUserId().equals(userId)) {
                throw new RuntimeException("Você não tem permissão para excluir este comentário.");
            }

            commentRepository.delete(comment);
        } else {
            throw new RuntimeException("Comentário não encontrado com o ID: " + commentId);
        }
    }


    private UUID getUserIdFromSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("usuarioId") != null) {
            return (UUID) session.getAttribute("usuarioId");
        }
        throw new IllegalStateException("Usuário não autenticado ou sessão expirou.");
    }
}

