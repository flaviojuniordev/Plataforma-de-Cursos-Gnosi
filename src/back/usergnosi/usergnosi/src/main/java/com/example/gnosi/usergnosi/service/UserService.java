package com.example.gnosi.usergnosi.service;

import com.example.gnosi.usergnosi.controller.CreateUserDto;
import com.example.gnosi.usergnosi.controller.UpdateUserDto;
import com.example.gnosi.usergnosi.entity.Student;
import com.example.gnosi.usergnosi.entity.Teacher;
import com.example.gnosi.usergnosi.entity.User;
import com.example.gnosi.usergnosi.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UUID createUser(CreateUserDto createUserDto) {
        if (!"STUDENT".equalsIgnoreCase(createUserDto.userType()) && !"TEACHER".equalsIgnoreCase(createUserDto.userType())) {
            throw new IllegalArgumentException("Invalid user type: " + createUserDto.userType());
        }

        User entity;
        if ("STUDENT".equalsIgnoreCase(createUserDto.userType())) {
            entity = new Student();
        } else if ("TEACHER".equalsIgnoreCase(createUserDto.userType())){
            entity = new Teacher();
        } else {
            throw new IllegalArgumentException("Invalid user type: " + createUserDto.userType());
        }

        entity.setFirstName(createUserDto.firstName());
        entity.setLastName(createUserDto.lastName());
        entity.setEmail(createUserDto.email());
        entity.setPassword(createUserDto.password());

        var userSave = userRepository.save(entity);
        return userSave.getUserId();
    }

    public Optional<User> getUserById(String userId) {
        if (!isValidUUID(userId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + userId);
        }
        return userRepository.findById(UUID.fromString(userId));
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public Optional<byte[]> getUserProfilePicture(String userId) {
        if (!isValidUUID(userId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + userId);
        }

        var userEntity = userRepository.findById(UUID.fromString(userId));
        if (userEntity.isPresent()) {
            var user = userEntity.get();
            return Optional.ofNullable(user.getProfilePicture());
        }

        return Optional.empty();
    }

    public List<User> listUsersByType(String userType) {
        return userRepository.findByUserType(userType);
    }

    public void updateUserById(String userId, UpdateUserDto updateUserDto, MultipartFile profilePicture) throws IOException {
        if (!isValidUUID(userId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + userId);
        }
        var id = UUID.fromString(userId);
        var userEntity = userRepository.findById(id);
        if (userEntity.isPresent()) {
            var user = userEntity.get();
            if (updateUserDto.firstName() != null) {
                user.setFirstName(updateUserDto.firstName());
            }
            if (updateUserDto.lastName() != null) {
                user.setLastName(updateUserDto.lastName());
            }
            if (updateUserDto.password() != null) {
                user.setPassword(updateUserDto.password());
            }

            if (profilePicture != null && !profilePicture.isEmpty()) {
                user.setProfilePicture(profilePicture.getBytes());
            }

            userRepository.save(user);
        }
    }

    public void deleteById(String userId) {
        if (!isValidUUID(userId)) {
            throw new IllegalArgumentException("Invalid UUID string: " + userId);
        }
        var id = UUID.fromString(userId);
        var userExists = userRepository.existsById(id);
        if (userExists) {
            userRepository.deleteById(id);
        }
    }

    public Optional<User> getUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    private boolean isValidUUID(String uuid) {
        try {
            UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}