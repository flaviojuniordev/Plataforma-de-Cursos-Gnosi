//package com.example.gnosi.usergnosi;
//
//import com.example.gnosi.usergnosi.controller.LoginUserDto;
//import com.example.gnosi.usergnosi.controller.UserController;
//import com.example.gnosi.usergnosi.entity.User;
//import com.example.gnosi.usergnosi.service.UserService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.Mockito.when;
//
//public class UserControllerTest {
//
//    @Mock
//    private UserService userService;
//
//    @InjectMocks
//    private UserController userController;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testLoginUser_Success() {
//        // Arrange
//        LoginUserDto loginUserDto = new LoginUserDto();
//        loginUserDto.setEmail("test@example.com");
//        loginUserDto.setPassword("password");
//
//        User user = new User();
//        user.setEmail("test@example.com");
//        user.setPassword("password");
//
//        when(userService.getUserByEmailAndPassword(anyString(), anyString())).thenReturn(Optional.of(user));
//
//        // Act
//        ResponseEntity<User> response = userController.loginUser(loginUserDto);
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(user, response.getBody());
//    }
//
//    @Test
//    public void testLoginUser_Unauthorized() {
//        // Arrange
//        LoginUserDto loginUserDto = new LoginUserDto();
//        loginUserDto.setEmail("test@example.com");
//        loginUserDto.setPassword("wrongpassword");
//
//        when(userService.getUserByEmailAndPassword(anyString(), anyString())).thenReturn(Optional.empty());
//
//        // Act
//        ResponseEntity<User> response = userController.loginUser(loginUserDto);
//
//        // Assert
//        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
//    }
//}