import { combineReducers } from "redux";
import authedUser from "./ducks/authedUser.js";
import questions from "./ducks/questions.js";
import users from "./ducks/users.js";

export default combineReducers({
    authedUser,
    questions,
    users,
});
