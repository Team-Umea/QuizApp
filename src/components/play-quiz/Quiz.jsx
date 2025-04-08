// src/Quiz.js
import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [ws, setWs] = useState(null);
  const [quizCode, setQuizCode] = useState("123212");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3009");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);

      console.log("Parsed message: ", parsedMessage);

      if (parsedMessage.type === "CURRENT_QUESTION") {
        setQuestion(parsedMessage.question.question);
      } else if (parsedMessage.type === "SCORE_UPDATE") {
        setScore(parsedMessage.score);
      } else if (parsedMessage.type === "ERROR") {
        alert(parsedMessage.message);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const joinQuiz = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: "JOIN_QUIZ", code: quizCode }));
    }
  };

  const submitAnswer = () => {
    if (ws && answer) {
      ws.send(JSON.stringify({ type: "ANSWER_QUESTION", code: quizCode, answer }));
      setAnswer(""); // Clear the answer input after submission
    }
  };

  return (
    <div>
      <h1>Quiz Application</h1>
      <input
        type="text"
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
        placeholder="Enter Quiz Code"
      />
      <button onClick={joinQuiz}>Join Quiz</button>

      {question && (
        <div>
          <h2>Question: {question}</h2>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your Answer"
          />
          <button onClick={submitAnswer}>Submit Answer</button>
        </div>
      )}

      <h3>Your Score: {score}</h3>
    </div>
  );
};

export default Quiz;
