import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";

const Home = () => {
  const [curUsername, setCurUsername] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const set_username = async () => {
    try {
      const response = await authService.get_user_info();
      if (response.success) {
        setCurUsername(response.data.username);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const base_url = "http://localhost:8000/quizz";
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(base_url + "/fetch_quizz");
      if (response.status === 200) {
        const allQuizzes = response.data.array_of_quizzes;

        const quizzesWithAuthors = await Promise.all(
          allQuizzes.map(async (quiz) => {
            try {
              const userInfo = await authService.get_user_info(quiz.author);
              const username = userInfo.success
                ? userInfo.data.username
                : "Невідомий";
              return { ...quiz, author: username };
            } catch (error) {
              console.error(
                `Error fetching author info for SID ${quiz.author}:`,
                error
              );
              return { ...quiz, author: "Невідомий" };
            }
          })
        );

        const shuffledQuizzes = quizzesWithAuthors.sort(
          () => 0.5 - Math.random()
        );
        const selectedQuizzes = shuffledQuizzes.slice(0, 9);

        setQuizzes(selectedQuizzes);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const colors = [
    "rgba(219, 164, 60, 1)", // колір 1
    "rgba(219, 60, 63, 1)", // колір 2
    "rgba(174, 60, 219, 1)", // колір 3
    "rgba(60, 116, 219, 1)", // колір 4
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length); // Вибираємо випадковий індекс
    return colors[randomIndex]; // Повертаємо випадковий колір
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      await set_username();
      await fetchQuizzes();
    };

    fetchData();
  }, []);

  return (
    <div className="home_container">
      <div className="header">
        <div className="logo">Quizi</div>
        <div className="search_container">
          <input
            type="text"
            placeholder="Пошук"
            className="search_input"
          ></input>
          <button className="search_button">
            <img src="/images/search.png"></img>
          </button>
        </div>
        <div className="userControls">
          <button
            className="addNewQuiz"
            onClick={() => navigate("/create_quiz")}
          >
            +
          </button>
          <button className="userCabinet">
            {curUsername || "Завантаження..."}
          </button>
        </div>
      </div>
      <div className="mainQuizes">
        <div className="titleQuizes">Quizzes</div>
        <div className="containerQuizes">
          {quizzes.map((quizz) => (
            <div key={quizz.quizz_id} className="quizCard">
              <div className="quizTitle">{quizz.title}</div>
              <div className="quizQuestionNumber">{quizz.questions} питань</div>
              <div className="authorStartBtn">
                <div className="quizAuthor">{quizz.author}</div>
                <button
                  className="startButton"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  Start quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
