import { get_user_id } from "../services/cache";

//add here models for quizz, choices, question and static method fromJSON() and toJSON()
class Quizz {
  constructor(quizz_SID, title, quizz_password, author_SID) {
    this.quizz_SID = quizz_SID;
    this.title = title;
    this.quizz_password = quizz_password;
    this.author_SID = get_user_id();
  }

  static fromJSON(json) {
    return new Quizz(
      json.quizz_SID,
      json.title,
      json.quizz_password,
      json.author_SID
    );
  }

  toJSON() {
    return {
      quizz_SID: this.quizz_SID,
      title: this.title,
      quizz_password: this.quizz_password,
      author_SID: this.author_SID,
    };
  }
}

class Question {
  constructor(question_SID, score, title, description, quizz_SID) {
    this.question_SID = question_SID;
    this.score = score;
    this.title = title;
    this.description = description;
    this.quizz_SID = quizz_SID;
  }

  static fromJSON(json) {
    return new Question(
      json.question_SID,
      json.score,
      json.title,
      json.description,
      json.quizz_SID
    );
  }

  toJSON() {
    return {
      question_SID: this.question_SID,
      score: this.score,
      title: this.title,
      description: this.description,
      quizz_SID: this.quizz_SID,
    };
  }
}

class Choice {
  constructor(option_SID, is_correct, main, question_SID) {
    this.option_SID = option_SID;
    this.is_correct = is_correct;
    this.main = main;
    this.question_SID = question_SID;
  }

  static fromJSON(json) {
    return new Choice(
      json.option_SID,
      json.is_correct,
      json.main,
      json.question_SID
    );
  }

  toJSON() {
    return {
      option_SID: this.option_SID,
      is_correct: this.is_correct,
      main: this.main,
      question_SID: this.question_SID,
    };
  }
}

class UserQuizz {
  constructor(user_SID, column_id, user_score, quizz_SID) {
    this.user_SID = user_SID;
    this.column_id = column_id;
    this.user_score = user_score;
    this.quizz_SID = quizz_SID;
  }

  static fromJSON(json) {
    return new UserQuizz(
      json.user_SID,
      json.column_id,
      json.user_score,
      json.quizz_SID
    );
  }

  toJSON() {
    return {
      user_SID: this.user_SID,
      column_id: this.column_id,
      user_score: this.user_score,
      quizz_SID: this.quizz_SID,
    };
  }
}
