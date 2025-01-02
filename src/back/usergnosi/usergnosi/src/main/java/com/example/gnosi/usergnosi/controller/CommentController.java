package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.entity.Comment;
import com.example.gnosi.usergnosi.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> saveComment(@RequestBody CommentDto commentDTO, HttpServletRequest request) {
        try {
            Comment savedComment = commentService.saveComment(commentDTO, request);
            return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint para buscar todos os comentários de um curso específico
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Comment>> getCommentsByCourseId(@PathVariable UUID courseId) {
        List<Comment> comments = commentService.getCommentsByCourseId(courseId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // Endpoint para excluir um comentário por ID
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteCommentById(@PathVariable UUID commentId, HttpServletRequest request) {
        try {
            commentService.deleteCommentById(commentId, request);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

