import React, { useState, useEffect } from "react";
import "./App.css";

const QuestionEditor = ({ onSave, onCancel, questionToEdit }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { id: "A", text: "", isCorrect: false },
    { id: "B", text: "", isCorrect: false },
    { id: "C", text: "", isCorrect: false },
  ]);
  const [points, setPoints] = useState(1);

  // Load question data if editing an existing question
  useEffect(() => {
    if (questionToEdit) {
      setQuestionText(questionToEdit.text);
      setOptions(questionToEdit.options);
      setPoints(questionToEdit.points);
    }
  }, [questionToEdit]);

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleOptionChange = (id, value) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, text: value } : option
      )
    );
  };

  const handleCorrectOptionChange = (id) => {
    setOptions(
      options.map((option) =>
        option.id === id
          ? { ...option, isCorrect: true }
          : { ...option, isCorrect: false }
      )
    );
  };

  const addMoreOption = () => {
    // Create next option ID (D, E, F, etc.)
    const nextId = String.fromCharCode(
      65 + options[options.length - 1].id.charCodeAt(0) - 64
    );

    setOptions([...options, { id: nextId, text: "", isCorrect: false }]);
  };

  const handleSave = () => {
    // Validate the question
    if (!questionText.trim()) {
      alert("Please enter a question");
      return;
    }

    // Check if at least one option has text
    const hasOptions = options.some((option) => option.text.trim() !== "");
    if (!hasOptions) {
      alert("Please add at least one answer option");
      return;
    }

    // Check if a correct answer is selected
    const hasCorrectAnswer = options.some((option) => option.isCorrect);
    if (!hasCorrectAnswer) {
      alert("Please select a correct answer");
      return;
    }

    const newQuestion = {
      questionText,
      options,
      points,
    };

    onSave(newQuestion);
  };

  const handlePointsChange = (e) => {
    setPoints(parseInt(e.target.value) || 1);
  };

  return (
    <div className="question-editor-container">
      <div className="question-editor">
        <div className="question-section">
          <h3>Write your question</h3>
          <p className="question-hint">
            Enter your question only, without answers.
          </p>
          <textarea
            className="question-textarea"
            value={questionText}
            onChange={handleQuestionChange}
            placeholder="Type your question here..."
          />
        </div>

        <div className="options-section">
          <h3>Add your multiple choice answer options</h3>
          <p className="options-hint">
            Test takers will select between these answer options.
          </p>

          {options.map((option) => (
            <div key={option.id} className="option-row">
              <div className="option-label">{option.id}.</div>
              <input
                type="text"
                className={`option-input ${
                  option.isCorrect ? "correct-option" : ""
                }`}
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                placeholder="Enter option text"
              />
              <div
                className={`option-checkbox ${
                  option.isCorrect ? "checked" : ""
                }`}
                onClick={() => handleCorrectOptionChange(option.id)}
              />
            </div>
          ))}

          <button className="add-option-btn" onClick={addMoreOption}>
            + Add more option
          </button>
        </div>

        <div className="question-footer">
          <div className="buttons-group">
            <button className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <div className="points-selector">
              <input
                type="number"
                min="1"
                value={points}
                onChange={handlePointsChange}
                className="points-input"
              />
              <span className="points-label">pt</span>
            </div>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
