import React from 'react';

interface QuestionProps {
    question: string;
    answers: string[];
    correctAnswer: number;
    selectedAnswer: number | null;
    onSelectAnswer: (answerIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({
                                               question,
                                               answers,
                                               selectedAnswer,
                                               onSelectAnswer,
                                           }) => {
    return (
        <div>
            <p>{question}</p>
            {answers.map((answer, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        name={question}
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => onSelectAnswer(index)}
                    />
                    {answer}
                </div>
            ))}
        </div>
    );
};

export default Question;