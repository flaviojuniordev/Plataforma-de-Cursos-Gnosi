package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.controller.LoginUserDto;
import com.example.gnosi.usergnosi.entity.User;
import com.example.gnosi.usergnosi.repository.UserRepository;
import com.example.gnosi.usergnosi.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/users/")
public class UserController {

    private final UserRepository userRepository;
    private UserService userService;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody CreateUserDto createUserDto) {
        if (!createUserDto.userType().equals("STUDENT") && !createUserDto.userType().equals("TEACHER")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        var userId = userService.createUser(createUserDto);
        return ResponseEntity.created(URI.create("/users/" + userId.toString())).build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") String userId) {
        var user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<byte[]> getUserProfilePicture(@PathVariable("userId") String userId) {
        var profilePicture = userService.getUserProfilePicture(userId);

        if (profilePicture.isPresent()) {
            byte[] imageBytes = profilePicture.get();

            if (isJPEG(imageBytes)) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);
                return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                        .body("Unsupported image type".getBytes());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Profile picture not found".getBytes());
    }

    private boolean isJPEG(byte[] imageBytes) {
        return imageBytes[0] == (byte) 0xFF && imageBytes[1] == (byte) 0xD8;
    }

    @GetMapping()
    public ResponseEntity<List<User>> listUsers(@RequestParam(required = false) String userType) {
        List<User> users;
        if (userType != null) {
            users = userService.listUsersByType(userType);
        } else {
            users = userService.listUsers();
        }
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateUserById(@PathVariable("userId") String userId,
                                               @RequestParam("firstName") String firstName,
                                               @RequestParam("lastName") String lastName,
                                               @RequestParam("password") String password,
                                               @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture) throws IOException {

        UpdateUserDto updateUserDto = new UpdateUserDto(firstName, lastName, password);
        userService.updateUserById(userId, updateUserDto, profilePicture);

        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteById(@PathVariable("userId") String userId, HttpServletRequest request, HttpServletResponse response) {
        try {
            userService.deleteById(userId);

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
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}