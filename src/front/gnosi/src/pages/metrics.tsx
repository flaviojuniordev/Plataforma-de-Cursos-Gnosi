import { useEffect, useState } from 'react';
import '../styles/metrics.css';
import useAuth from '../components/useAuth';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Footer } from "../components/Footer.tsx";
import { Navbar } from "../components/NavBar.tsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Metrics() {
    const { userId } = useAuth();
    const [averageModuleMetrics, setAverageModuleMetrics] = useState<{ averageModuleRate: number | null, totalCourses: number | null, totalModules: number | null }>({ averageModuleRate: null, totalCourses: null, totalModules: null });
    const [studentTeacherRatio, setStudentTeacherRatio] = useState<{ students: number | null, teachers: number | null, razaoAlunoProfessor: number | null }>({ students: null, teachers: null, razaoAlunoProfessor: null });
    const [programmingPercentage, setProgrammingPercentage] = useState<{ programmingStudents: number | null, totalStudents: number | null, percentage: number | null }>({ programmingStudents: null, totalStudents: null, percentage: null });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            if (userId === 'b1daabf0-72a1-4c67-b812-1312afc86af8') {
                fetchAverageModuleRate(userId);
                fetchStudentTeacherRatio(userId);
                fetchProgrammingPercentage(userId);
            } else {
                setError('Acesso negado: apenas administradores podem acessar esta página.');
            }
        }
    }, [userId]);

    const fetchAverageModuleRate = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/metrics/average-module-rate/${userId}`);
            if (!response.ok) throw new Error('Erro ao buscar taxa média de módulos.');
            const data = await response.json();
            setAverageModuleMetrics({
                averageModuleRate: data.average_module_rate,
                totalCourses: data.total_courses,
                totalModules: data.total_modules,
            });
        } catch (error) {
            setError('Erro ao buscar taxa média de módulos.');
        }
    };

    const fetchStudentTeacherRatio = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/metrics/student-teacher-ratio/${userId}`);
            if (!response.ok) throw new Error('Erro ao buscar relação aluno-professor.');
            const data = await response.json();
            setStudentTeacherRatio({
                students: data.total_students,
                teachers: data.total_teachers,
                razaoAlunoProfessor: data.razao_aluno_professor,
            });
        } catch (error) {
            setError('Erro ao buscar relação aluno-professor.');
        }
    };

    const fetchProgrammingPercentage = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/metrics/programming-percentage/${userId}`);
            if (!response.ok) throw new Error('Erro ao buscar porcentagem de alunos em cursos de programação.');
            const data = await response.json();
            setProgrammingPercentage({
                programmingStudents: data.total_programming_students,
                totalStudents: data.total_students,
                percentage: data.programming_percentage,
            });
        } catch (error) {
            setError('Erro ao buscar porcentagem de alunos em cursos de programação.');
        }
    };

    if (error) {
        return <div className="metrics-container"><p>{error}</p></div>;
    }

    const averageModuleChartData = {
        labels: ['Módulos', 'Cursos', 'Razão'],
        datasets: [
            {
                label: 'Relação módulos-cursos',
                data: [averageModuleMetrics.totalModules, averageModuleMetrics.totalCourses, averageModuleMetrics.averageModuleRate],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const studentTeacherChartData = {
        labels: ['Alunos', 'Professores', 'Razão'],
        datasets: [
            {
                label: 'Relação Aluno-Professor',
                data: [studentTeacherRatio.students, studentTeacherRatio.teachers, studentTeacherRatio.razaoAlunoProfessor],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
        indexAxis: 'y',
    };

    const programmingPercentageChartData = {
        labels: ['Programadores', 'Total de Alunos', '% de Alunos'],
        datasets: [
            {
                label: 'Taxa de Alunos em Programação',
                data: [programmingPercentage.programmingStudents, programmingPercentage.totalStudents, programmingPercentage.percentage],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
        indexAxis: 'y',
    };

    return (
        <div className="metrics-page-container">
            <Navbar userName={""}/>
            <div className="metrics-container">
                <div className="metrics-content">
                    <h1 className="metrics-title">Indicadores de Desempenho do Gnosi</h1>
                    <div className="metrics-content-wrapper">
                        <div className="metric-card">
                            <h2>Taxa de Módulos por Curso</h2>
                            <Bar data={averageModuleChartData} />
                        </div>
                        <div className="metric-card">
                            <h2>Taxa entre Alunos e Professores</h2>
                            <Bar data={studentTeacherChartData} />
                        </div>
                        <div className="metric-card">
                            <h2>Taxa de Alunos em Programação</h2>
                            <Bar data={programmingPercentageChartData} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}