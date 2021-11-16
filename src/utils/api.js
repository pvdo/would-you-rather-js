import { _saveQuestion, _saveQuestionAnswer, _saveUser } from "./_DATA";
export const saveQuestion = (question) => {
    console.log("APi Question", question);
    question.author = question.authedUser;
    return _saveQuestion(question);
};

export const saveQuestionAnswer = (question) => {
    return _saveQuestionAnswer(question);
};

export const saveUser = (username, password) => {
    return _saveUser(username, password);
};
