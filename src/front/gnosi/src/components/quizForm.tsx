import React from 'react';

interface QuizFormProps {
    question: string;
    answers: string[];
    correctAnswer: number;
    setQuestion: React.Dispatch<React.SetStateAction<string>>;
    setCorrectAnswer: React.Dispatch<React.SetStateAction<number>>;
    handleAnswerChange: (index: number, value: string) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
                                               question,
                                               answers,
                                               correctAnswer,
                                               setQuestion,
                                               setCorrectAnswer,
                                               handleAnswerChange,
                                           }) => {
    return (
        <div>
            <div>
                <label>Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div>
                <label>Answers:</label>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            placeholder={`Answer ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            <div>
                <label>Correct Answer (1-4):</label>
                <input
                    type="number"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(+e.target.value)}
                    min="1"
                    max="4"
                />
            </div>
        </div>
    );
};

export default QuizForm;