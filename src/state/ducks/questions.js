//-----TYPES-----//
export const RECEIVE_QUESTIONS =
    "would-you-rather-js/questions/receive_questions";
export const ADD_QUESTION = "would-you-rather-js/questions/add_question";
export const VOTE_QUESTION = "would-you-rather-js/questions/vote_question";
//-----REDUCERS------//

const questions = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state, //(...) used to get a copy of state.
                ...action.questions,
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            };
        case VOTE_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    optionOne: {
                        text: state[action.qid].optionOne.text,
                        votes:
                            action.answer === "optionOne" &&
                            !state[action.qid].optionOne.votes.includes(
                                action.authedUser
                            )
                                ? state[action.qid].optionOne.votes.concat([
                                      action.authedUser,
                                  ])
                                : state[action.qid].optionOne.votes.filter(
                                      (userId) => userId !== action.authedUser
                                  ),
                    },
                    optionTwo: {
                        text: state[action.qid].optionTwo.text,
                        votes:
                            action.answer === "optionTwo" &&
                            !state[action.qid].optionTwo.votes.includes(
                                action.authedUser
                            )
                                ? state[action.qid].optionTwo.votes.concat([
                                      action.authedUser,
                                  ])
                                : state[action.qid].optionTwo.votes.filter(
                                      (userId) => userId !== action.authedUser
                                  ),
                    },
                },
            };
        default:
            return state;
    }
};
export default questions;

//-----ACTIONS------//
export const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
};
export const addQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question,
    };
};
export const voteQuestion = ({ qid, answer, authedUser }) => {
    return {
        type: VOTE_QUESTION,
        qid,
        answer,
        authedUser,
    };
};
