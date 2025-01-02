package com.example.gnosi.usergnosi.controller;

import com.example.gnosi.usergnosi.service.MetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/metrics")
public class MetricsController {

    @Autowired
    private MetricsService metricsService;

    // Defina o ID do administrador (baseado no user_id fornecido)
    private final String ADMIN_USER_ID = "b1daabf0-72a1-4c67-b812-1312afc86af8";

    // Valida se o usuário é administrador
    private boolean isAdmin(String userId) {
        return ADMIN_USER_ID.equals(userId);
    }

    // 1. Média de módulos por curso
    @GetMapping("/average-module-rate/{userId}")
    public Map<String, Object> getAverageModuleRate(@PathVariable String userId) {
        System.out.println("Recebendo requisição para average-module-rate com userId: " + userId);
        if (!isAdmin(userId)) {
            throw new RuntimeException("Acesso negado: apenas administradores podem acessar esta métrica.");
        }

        Object[] result = metricsService.getAverageModuleRate();

        Map<String, Object> response = new HashMap<>();
        response.put("average_module_rate", result[0]);
        response.put("total_courses", result[1]);
        response.put("total_modules", result[2]);
        return response;
    }

    // 2. Taxa de alunos em relação a professores
    @GetMapping("/student-teacher-ratio/{userId}")
    public Map<String, Object> getStudentTeacherRatio(@PathVariable String userId) {
        if (!isAdmin(userId)) {
            throw new RuntimeException("Acesso negado: apenas administradores podem acessar esta métrica.");
        }

        Object[] result = metricsService.getStudentTeacherRatio();

        Map<String, Object> response = new HashMap<>();
        response.put("total_students", result[0]);
        response.put("total_teachers", result[1]);
        response.put("razao_aluno_professor", result[2]);
        return response;
    }

    // 3. Porcentagem de alunos em cursos de programação
    @GetMapping("/programming-percentage/{userId}")
    public Map<String, Object> getProgrammingPercentage(@PathVariable String userId) {
        if (!isAdmin(userId)) {
            throw new RuntimeException("Acesso negado: apenas administradores podem acessar esta métrica.");
        }

        Object[] result = metricsService.getProgrammingPercentage();

        Map<String, Object> response = new HashMap<>();
        response.put("total_programming_students", result[0]);
        response.put("total_students", result[1]);
        response.put("programming_percentage", result[2]);
        return response;
    }
}