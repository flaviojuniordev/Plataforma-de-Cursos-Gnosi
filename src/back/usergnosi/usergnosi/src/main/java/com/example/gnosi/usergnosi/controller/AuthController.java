package com.example.gnosi.usergnosi.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.example.gnosi.usergnosi.entity.User;
import com.example.gnosi.usergnosi.service.UserService;
import com.example.gnosi.usergnosi.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginUserDto loginUserDto) {
        var user = userService.getUserByEmailAndPassword(loginUserDto.getEmail(), loginUserDto.getPassword());

        if (user.isPresent()) {

            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

            // Cria sessão HTTP
            HttpSession session = request.getSession(true);
            session.setAttribute("usuarioId", user.get().getUserId());

            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // Remover o cookie
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-session")
    public ResponseEntity<Void> checkSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null && session.getAttribute("usuarioId") != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<String> getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null && session.getAttribute("usuarioId") != null) {
            UUID userId = (UUID) session.getAttribute("usuarioId");


            return ResponseEntity.ok(userId.toString());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/current-user-type")
    public ResponseEntity<String> getCurrentUserType(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null && session.getAttribute("usuarioId") != null) {
            UUID userId = (UUID) session.getAttribute("usuarioId");

            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                String userType = user.getUserType();

                if ("TEACHER".equals(userType)) {
                    return ResponseEntity.ok("TEACHER");
                } else if ("STUDENT".equals(userType)) {
                    return ResponseEntity.ok("STUDENT");
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body("Tipo de usuário não permitido");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
