import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/NavBar';
import '../styles/quizViewer.css';

interface Question {
    questionText: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

interface QuizData {
    quizId: string;
    title: string;
    questions: Question[];
    course: {
        name: string;
        description: string;
        category: string;
    };
}

const QuizViewer: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<{ correct: number; incorrect: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                console.log("Fetching quiz with CourseID:", courseId);

                const response = await fetch(`http://localhost:8080/quizzes/course/${courseId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const quizzes = await response.json();
                    const quiz = quizzes[0];
                    setQuizData(quiz);
                    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
                } else {
                    console.error('Failed to load quiz, status:', response.status);
                    setQuizData(null);
                }
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setQuizData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [courseId]);

    const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleSubmit = async () => {
        if (!quizData) return;

        const correctAnswers = quizData.questions.reduce((score, question, index) => {
            return selectedAnswers[index] === question.correctAnswer ? score + 1 : score;
        }, 0);

        const incorrectAnswers = quizData.questions.length - correctAnswers;
        setResult({ correct: correctAnswers, incorrect: incorrectAnswers });
        setSubmitted(true);
        setQuizCompleted(true);

        try {
            const response = await fetch(`http://localhost:8080/quizzes/${quizData.quizId}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: courseId,
                    correctAnswers: correctAnswers,
                    totalQuestions: quizData.questions.length,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                console.error('Failed to save quiz result');
            }
        } catch (error) {
            console.error('Error saving quiz result:', error);
        }
    };

    const handleGenerateCertificate = () => {
        navigate(`/certificate/${courseId}`, {
            state: { course: quizData?.course }, // Passando o curso para a página de certificado
        });
    };

    return (
        <div className="quiz-viewer-container">
            <Navbar userName="User Name" />
            <div className="quiz-container">
                {loading ? (
                    <p>Carregando quiz...</p>
                ) : quizData ? (
                    <>
                        <h1>{quizData.title}</h1>
                        <div className="quiz-content">
                            {quizData.questions.map((quizItem, index) => (
                                <div key={index} className="question-container">
                                    <h3>{quizItem.questionText}</h3>
                                    <div className="answers-container">
                                        {[quizItem.answer1, quizItem.answer2, quizItem.answer3, quizItem.answer4].map((answer, answerIndex) => (
                                            <div
                                                key={answerIndex}
                                                className={`answer-option ${selectedAnswers[index] === answerIndex ? 'selected' : ''} ${submitted && answerIndex === quizItem.correctAnswer ? 'correct' : ''} ${submitted && selectedAnswers[index] !== quizItem.correctAnswer && selectedAnswers[index] === answerIndex ? 'incorrect' : ''}`}
                                                onClick={() => handleAnswerSelect(index, answerIndex)}
                                            >
                                                {answer}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {submitted ? (
                                <div className="score">
                                    <h3>Você acertou {result?.correct} de {quizData.questions.length} questões corretas!</h3>
                                </div>
                            ) : (
                                <button className="submit-btn" onClick={handleSubmit}>
                                    Enviar respostas
                                </button>
                            )}
                        </div>
                        {quizCompleted && (
                            <div className="mt-8 flex justify-center">
                                <button className="submit-btn" onClick={handleGenerateCertificate}
                                        style={{backgroundColor: '#AA47F0'}}>
                                    Parabéns! Clique aqui para gerar o seu certificado do curso
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p>Quiz não encontrado ou ocorreu um erro ao carregar o quiz.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default QuizViewer;