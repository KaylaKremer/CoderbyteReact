import React, { useState, useMemo } from "react"
import { createRoot } from "react-dom/client"

const style = {
    container: {
        padding: "20px",
        border: "1px solid #E0E0E0",
        borderRadius: "15px",
        width: "max-content",
        marginBottom: "40px",
    },
    question: {
        fontWeight: "bold",
        marginBottom: "10px",
    },
    options: {
        marginBottom: "5px",
    },
    button: {
        marginTop: "10px",
        padding: "10px 15px",
        border: "none",
        backgroundColor: "#007BFF",
        color: "#FFF",
        fontSize: "14px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    feedback: {
        marginTop: "10px",
        fontSize: "14px",
    },
}

const QuizOption = ({ option, index, answer, setAnswer }) => {
    const onChange = ({ target: { value } }) => setAnswer(value)
    return (
        <>
            <input
                type="radio"
                onChange={onChange}
                checked={option === answer}
                name="answers"
                value={option}
                id={`option${index}`}
            />
            <label htmlFor={option}>{option}</label>
        </>
    )
}

function QuizApp() {
    // do not modify the questions or answers below
    const questions = useMemo(
        () => [
            {
                question: "What is the capital of France?",
                options: ["London", "Paris", "Berlin", "Madrid"],
                correct: "Paris",
            },
            {
                question: "What is the capital of Germany?",
                options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
                correct: "Berlin",
            },
        ],
        []
    )

    const questionsTotal = useMemo(() => questions.length, [questions])

    const [questionsIndex, setQuestionsIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [feedback, setFeedback] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [completedQuiz, setCompletedQuiz] = useState(false)

    const submit = () => {
        if (answer === questions[questionsIndex].correct) {
            setScore(score + 1)
            setFeedback("Correct!")
        } else {
            setFeedback("Incorrect!")
        }

        if (questionsIndex === questionsTotal - 1) {
            setCompletedQuiz(true)
        } else {
            setQuestionsIndex(questionsIndex + 1)
            setAnswer(null)
        }
    }

    return (
        <div style={style.container}>
            <div id="question" style={style.question}>
                {`${questions[questionsIndex].question}`}
            </div>
            <div style={style.options}>
                {questions[questionsIndex].options.map((option, index) => (
                    <QuizOption
                        key={`option-${index}`}
                        option={option}
                        index={index}
                        answer={answer}
                        setAnswer={setAnswer}
                    />
                ))}
            </div>
            <button
                disabled={completedQuiz}
                style={style.button}
                id="submitBtn"
                onClick={submit}
            >
                Submit
            </button>
            <div id="feedback" style={style.feedback}>
                {questionsIndex !== 0 && !completedQuiz && `${feedback}`}
            </div>
            <div id="score" style={style.feedback}>
                {completedQuiz &&
                    `Quiz complete! You scored ${score} out of ${questions.length}!`}
            </div>
        </div>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<QuizApp />)
