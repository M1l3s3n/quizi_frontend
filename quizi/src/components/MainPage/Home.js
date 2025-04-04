import React, { useState, useEffect } from "react";
import "./Home.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";

const Home = () => {
    const [curUsername, setCurUsername] = useState("");

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

    const navigate = useNavigate();

    const fakeQuizzes = [
        {
            id: 1,
            title: "JavaScript Basics",
            questions: [1, 2, 3],
            author: "John Doe",
        },
        {
            id: 2,
            title: "React Fundamentals",
            questions: [1, 2, 3, 4],
            author: "Jane Smith",
        },
        {
            id: 3,
            title: "Node.js Mastery",
            questions: [1, 2],
            author: "Alex Brown",
        },
        {
            id: 4,
            title: "HTML & CSS",
            questions: [1, 2, 3, 4, 5],
            author: "Sarah Lee",
        },
        {
            id: 5,
            title: "Python for Beginners",
            questions: [1, 2, 3, 4],
            author: "Mike Ross",
        },
        {
            id: 6,
            title: "Machine Learning",
            questions: [1, 2, 3],
            author: "Anna White",
        },
        {
            id: 7,
            title: "Cybersecurity Basics",
            questions: [1, 2, 3, 4],
            author: "David Clark",
        },
        {
            id: 8,
            title: "SQL & Databases",
            questions: [1, 2],
            author: "Chris Martin",
        },
        {
            id: 9,
            title: "TypeScript Guide",
            questions: [1, 2, 3, 4, 5],
            author: "Emma Watson",
        },
    ];

    const [quizzes, setQuizzes] = useState(fakeQuizzes);

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

    useEffect(() => {
        const fetchUsername = async () => {
            await set_username();
        };

        fetchUsername();
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
                    <button className="addNewQuiz">+</button>
                    <button className="userCabinet">{curUsername}</button>
                </div>
            </div>
            <div className="mainQuizes">
                <div className="titleQuizes">Quizzes</div>
                <div className="containerQuizes">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="quizCard">
                            <div className="quizTitle">{quiz.title}</div>
                            <div className="quizQuestionNumber">
                                {quiz.questions.length} питань
                            </div>
                            <div className="authorStartBtn">
                                <div className="quizAuthor">{quiz.author}</div>
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



// import authService from "../../services/auth";


//   const Home = () => {

//  *PLACE THE NEXT CODE SNIPPET AFTER CONST HOME ABOVE*

// const [curUsername, setCurUsername] = useState("");
// const set_username = async () => {
//     try {

//         const response = await authService.get_user_info();
//         if (response.success) {

//             setCurUsername(response.data.username);
//         }
//     } catch (error) {
//         console.error("error:", error);
//     }
// };

//  *PLACE THE FOLLOWING CODE SNIPPET BEFORE THE RETURN(WITH PAGE HTML)*

//     useEffect(() => {
//     const fetchUsername = async () => {
//         await set_username();
//     };

//     fetchUsername();
// }, []);

//  return(


//              NOW U CAN USE    {curUsername}    INSTEAD OF NICKNAME TEXT
//               EXAMPLE:            <div>{curUsername}</div>

