import React, { useState, useEffect } from "react";
import "./Creater.css";
import { useNavigate } from "react-router-dom";
import QuestionEditor from "./QuestionEditor.jsx";
import authService from "../../services/auth";

function Creater() {
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

  const searchIcon = `${process.env.PUBLIC_URL}/images/search.png`;
  const [testIntroduction, setTestIntroduction] = useState("");
  const [isIntroEditing, setIsIntroEditing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const handleAddIntroduction = () => {
    setIsIntroEditing(true);
  };

  const handleIntroductionChange = (e) => {
    setTestIntroduction(e.target.value);
  };

  const handleIntroductionSubmit = () => {
    setIsIntroEditing(false);
  };

  const handleAddQuestion = () => {
    setEditingQuestionId(null);
    setShowQuestionEditor(true);
  };

  const handleEditQuestion = (questionId) => {
    setEditingQuestionId(questionId);
    setShowQuestionEditor(true);
  };

  const handleSaveQuestion = (newQuestion) => {
    if (editingQuestionId) {
      // Edit existing question
      setQuestions(
        questions.map((q) =>
          q.id === editingQuestionId
            ? {
                ...q,
                text: newQuestion.questionText,
                options: newQuestion.options,
                points: newQuestion.points,
              }
            : q
        )
      );
    } else {
      // Add new question
      setQuestions([
        ...questions,
        {
          id: Date.now(),
          text: newQuestion.questionText,
          options: newQuestion.options,
          points: newQuestion.points,
        },
      ]);
    }
    setShowQuestionEditor(false);
  };

  const handleCancelQuestion = () => {
    setShowQuestionEditor(false);
    setEditingQuestionId(null);
  };

  useEffect(() => {
    const fetchUsername = async () => {
      await set_username();
    };

    fetchUsername();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1
          className="logo"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          Quizi
        </h1>
        <div className="search_container">
          <input type="text" className="search_input" placeholder="Пошук" />
          <span className="search_button">
            <img src={searchIcon} alt="Search" />
          </span>
        </div>
        <div className="userCabinetCreater">
          {curUsername || "Завантаження..."}
        </div>
      </header>

      <main className="content">
        {showQuestionEditor ? (
          <QuestionEditor
            onSave={handleSaveQuestion}
            onCancel={handleCancelQuestion}
            questionToEdit={
              editingQuestionId
                ? questions.find((q) => q.id === editingQuestionId)
                : null
            }
          />
        ) : (
          <div className="quiz-builder">
            <div className="quiz-controls">
              <div className="quiz-buttons">
                <button
                  className="add-question-btn"
                  onClick={handleAddQuestion}
                >
                  Add question
                </button>
                <button className="publish-btn">Publish</button>
              </div>
            </div>

            <div className="introduction-section">
              <div className="introduction-header">
                {testIntroduction
                  ? "Test Introduction"
                  : "Test Introduction (optional)"}
              </div>

              {isIntroEditing ? (
                <div className="introduction-edit">
                  <textarea
                    value={testIntroduction}
                    onChange={handleIntroductionChange}
                    placeholder="Add your test introduction here..."
                  />
                  <button onClick={handleIntroductionSubmit}>Save</button>
                </div>
              ) : (
                <div className="add-intro" onClick={handleAddIntroduction}>
                  {testIntroduction ? (
                    <p>{testIntroduction}</p>
                  ) : (
                    <span>+ Add introduction</span>
                  )}
                </div>
              )}
            </div>

            <div className="questions-container">
              {questions.length > 0 ? (
                <div className="questions-list">
                  {questions.map((question, index) => (
                    <div key={question.id} className="question-card">
                      <div className="question-header">
                        <div className="question-title">
                          Question {index + 1}
                        </div>
                        <div className="question-points">
                          {question.points} pt
                        </div>
                      </div>
                      <div className="question-content">
                        <div className="question-text">{question.text}</div>
                        <div className="question-options">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className={`question-option ${
                                option.isCorrect ? "correct" : ""
                              }`}
                            >
                              {option.id}. {option.text}
                            </div>
                          ))}
                        </div>
                        <div className="question-actions">
                          <button
                            className="edit-button"
                            onClick={() => handleEditQuestion(question.id)}
                          >
                            📝 Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-questions">
                  <p>No Questions are in your Test yet.</p>
                  <p>
                    Use the 'Add Question' button in the top bar to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Creater;
