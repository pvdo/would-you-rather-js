// ------- INITIAL DATA DEPENDENCIES ------ //
import { getInitialData } from "../../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

// ------- ADD VOTED QUESTION TO USERS AND QUESTIONS ------ //
import { voteQuestion } from "./questions";
import { addAnswerToUser } from "./users";
import { saveQuestionAnswer } from "../../utils/api";

// ------- ADD CREATED QUESTION TO USERS AND QUESTIONS ------ //
import { saveQuestion } from "../../utils/api";
import { addQuestion } from "./questions";
import { addQuestionToUser } from "./users";

// ------- LOGIN USER TO AUTHEDUSER ------ //
import { setAuthedUser } from "./authedUser";

// ------- LOGOUT USER TO AUTHEDUSER ------ //
import { logOffAuthUser } from "./authedUser";

// ------- ADD USER TO USERS ------ //
import { saveUser } from "../../utils/api";
import { addUser } from "./users";

/**
 * Dispatch initial data to the store: Tweets and User
 */
export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            console.log("HandleInitialData");
        });
    };
}

/**
 * Function to add vote to the questions and users states
 *
 * @param    {Object} question               - question that was voted by user
 * @param    {String} question.qid           - question id
 * @param    {String} question.answer        - the users answer
 * @param    {String} question.authedUser    - the users id
 * @return   {Function}                      - Dispatch question to the state
 */
export const handleVoteQuestion = (question) => {
    return (dispatch) => {
        dispatch(voteQuestion(question));
        dispatch(addAnswerToUser(question));
        return saveQuestionAnswer(question).catch((e) => {
            console.warn("Error in handleVoteQuestion: ", e);
            dispatch(voteQuestion(question));
            alert("There was error on voting.");
        });
    };
};

/**
 * Function to add a new question to the questions and users states
 *
 * @param    {Object} question               - question that was created by user
 * @param    {String} question.optionOneText - text of the first option
 * @param    {String} question.optionTwoText - text of the second option
 * @param    {String} question.authedUser    - the users id
 * @return   {Function}                      - Dispatch question to the state
 */
export const handleCreateQuestion = (question) => {
    return (dispatch) => {
        return saveQuestion(question)
            .then((formattedQuestion) => {
                dispatch(addQuestion(formattedQuestion));
                dispatch(addQuestionToUser(formattedQuestion));
            })
            .catch((e) => {
                console.warn("Error in handleCreateQuestion: ", e);
                alert("There was error on create a new question.");
            });
    };
};

/**
 * Function to make selected user to authedUser
 *
 * @param    {Object} user                   - user id selected by the user
 * @return   {Function}                      - Dispatch user to the authedUser state
 */
export const handleLogin = (user) => {
    return (dispatch) => {
        return dispatch(setAuthedUser(user));
    };
};

/**
 * Function to add a new question to the questions and users states
 *
 * @param    {Object} question               - question that was created by user
 * @param    {String} question.optionOneText - text of the first option
 * @param    {String} question.optionTwoText - text of the second option
 * @param    {String} question.authedUser    - the users id
 * @return   {Function}                      - Dispatch question to the state
 */
export const handleCreateUser = (username, password) => {
    return (dispatch) => {
        return saveUser(username, password)
            .then(() => {
                dispatch(addUser(username, password));
            })
            .catch((e) => {
                console.warn("Error in handleCreateUser: ", e);
                alert("There was error on create a new user.");
            });
    };
};

export const handleLogOut = () => {
    return (dispatch) => {
        return dispatch(logOffAuthUser());
    };
};
