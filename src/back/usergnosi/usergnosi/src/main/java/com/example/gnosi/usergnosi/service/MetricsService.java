package com.example.gnosi.usergnosi.service;

import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.math.BigDecimal;

@Service
public class MetricsService {

    @PersistenceContext
    private EntityManager entityManager;

    // 1. Média de módulos por curso
    public Object[] getAverageModuleRate() {
        String sql = """
            WITH CourseModules AS (
                SELECT
                    c.course_id AS course_id,
                    c.name AS course_name,
                    COUNT(m.module_id) * 1.0 AS module_rate
                FROM
                    tb_courses c
                LEFT JOIN
                    tb_modules m ON m.course_id = c.course_id
                GROUP BY
                    c.course_id, c.name
            )
            SELECT
                AVG(module_rate) AS average_module_rate,
                COUNT(DISTINCT course_id) AS total_courses,
                SUM(module_rate) AS total_modules
            FROM
                CourseModules;
        """;

        Query query = entityManager.createNativeQuery(sql);
        Object result = query.getSingleResult();

        if (result != null && result instanceof Object[]) {
            return (Object[]) result;
        } else {
            return null;
        }
    }

    // 2. Taxa de alunos em relação a professores
    public Object[] getStudentTeacherRatio() {
        String sql = """
        WITH UserCounts AS (
            SELECT
                usertype,
                COUNT(*) AS total_users
            FROM
                tb_users
            WHERE
                usertype IN ('STUDENT', 'TEACHER')
            GROUP BY
                usertype
        ),
        StudentTeacherRatio AS (
            SELECT
                (SELECT total_users FROM UserCounts WHERE usertype = 'STUDENT') AS total_students,
                (SELECT total_users FROM UserCounts WHERE usertype = 'TEACHER') AS total_teachers
        )
        SELECT
            total_students,
            total_teachers,
            ROUND(total_students * 1.0 / total_teachers, 2) AS razao_aluno_professor
        FROM
            StudentTeacherRatio;
    """;

        Query query = entityManager.createNativeQuery(sql);
        Object result = query.getSingleResult();

        if (result != null && result instanceof Object[]) {
            return (Object[]) result;
        } else {
            return null;
        }
    }

    // 3. Porcentagem de alunos em cursos de programação
    public Object[] getProgrammingPercentage() {
        String sql = """
            WITH ProgrammingCourses AS (
                SELECT
                    course_id
                FROM
                    tb_courses
                WHERE
                    category IN ('BackEnd', 'FrontEnd', 'FullStack')
            ),
            EnrollmentsCounts AS (
                SELECT
                    COUNT(DISTINCT e.student_id) AS total_programming_students
                FROM
                    tb_enrollments e
                JOIN
                    ProgrammingCourses pc ON e.course_id = pc.course_id
            ),
            TotalEnrollments AS (
                SELECT
                    COUNT(DISTINCT student_id) AS total_students
                FROM
                    tb_enrollments
            )
            SELECT
                ec.total_programming_students,
                te.total_students,
                ROUND(ec.total_programming_students * 100.0 / te.total_students, 2) AS programming_percentage
            FROM
                EnrollmentsCounts ec
            CROSS JOIN
                TotalEnrollments te;
        """;

        Query query = entityManager.createNativeQuery(sql);
        Object result = query.getSingleResult();

        if (result != null && result instanceof Object[]) {
            return (Object[]) result;
        } else {
            return null;
        }
    }
}
