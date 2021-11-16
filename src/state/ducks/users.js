//------TYPES-----//

export const RECEIVE_USERS = "would-you-rather-js/users/receive_users";
export const ADD_USER = "would-you-rather-js/users/add_user";
export const ADD_ANSWER_TO_USER =
    "would-you-rather-js/users/add_answer_to_user";
export const ADD_QUESTION_TO_USER =
    "would-you-rather-js/users/add_question_to_user";

//------REDUCER-----//

const users = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state, //(...) used to get a copy of state.
                ...action.users,
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.user], //MUDAR AQUI ESTA ERRADOOOOO
            };
        case ADD_ANSWER_TO_USER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer,
                    },
                },
            };
        case ADD_QUESTION_TO_USER:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([
                        action.question.id,
                    ]),
                },
            };
        default:
            return state;
    }
};

export default users;

//------ACTIONS-----//
export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users,
    };
};
export const addUser = (user) => {
    return {
        type: ADD_USER,
        user,
    };
};

export const addAnswerToUser = ({ qid, answer, authedUser }) => {
    return {
        type: ADD_ANSWER_TO_USER,
        qid,
        answer,
        authedUser,
    };
};

export const addQuestionToUser = (question) => {
    return {
        type: ADD_QUESTION_TO_USER,
        question,
    };
};
