import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/quizCreator.css';
import { Footer } from '../components/Footer';
import { Aside } from '../components/Aside';
import { Navbar } from '../components/NavBar';

const QuizCreator: React.FC = () => {
    const [questions, setQuestions] = useState<{ question: string; answers: string[]; correctAnswer: number }[]>([]);
    const [question, setQuestion] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState<number>(1);
    const [quizTitle, setQuizTitle] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId } = location.state || {};

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleAddQuestion = () => {
        const newQuestion = {
            question,
            answers,
            correctAnswer: correctAnswer - 1,
        };
        setQuestions([...questions, newQuestion]);
        setQuestion('');
        setAnswers(['', '', '', '']);
        setCorrectAnswer(1);
    };

    const handleSubmit = async () => {
        const quizData = {
            title: quizTitle,
            courseId: courseId.replace(/"/g, ''),
            questions: questions.map(q => ({
                question: q.question,
                answer1: q.answers[0],
                answer2: q.answers[1],
                answer3: q.answers[2],
                answer4: q.answers[3],
                correctAnswer: q.correctAnswer,
            })),
        };

        try {
            const response = await fetch('http://localhost:8080/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData),
            });

            if (response.ok) {
                await response.json();
                navigate('/home');
            } else {
                console.error('Failed to create quiz');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        console.log('Received Course ID:', courseId);
    }, [courseId]);

    return (
        <>
            <Navbar userName={null} />
            <div className="container">
                <Aside />
                <div className="quiz-creator-container">
                    <main>
                        <h2> Criar avaliação do curso:</h2>
                        <div className="question-container">
                            <label className="label">Título da Avaliação:</label>
                            <input type="text" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
                        </div>
                        <div className="question-container">
                            <label className="label">Questão:</label>
                            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        </div>
                        <div className="answers-container">
                            <label className="label">Resposta:</label>
                            {answers.map((answer, index) => (
                                <div key={index} className="answer-option">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        placeholder={`Alternativa ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label className="label">Alternativa correta :</label>
                            <input
                                type="number"
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(+e.target.value)}
                                min="1"
                                max="4"
                            />
                        </div>
                        <button className="add-option-btn" onClick={handleAddQuestion}>Adicionar Questão</button>
                        <div>
                            <h3>Questões adicionadas:</h3>
                            <ul>
                                {questions.map((q, index) => (
                                    <li key={index}>
                                        <strong>{q.question}</strong> | Resposta correta: {q.answers[q.correctAnswer]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {questions.length > 0 && <button className="submit-btn" onClick={handleSubmit}>Criar Quiz</button>}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default QuizCreator;
