//------TYPES-----//
export const SET_AUTHED_USER = "would-you-rather-js/authedUser/set_authedUser";
export const LOGOFF_AUTHED_USER =
    "would-you-rather-js/authedUser/logoff_authedUser";

//------REDUCERS-----//
const initialState = null;
const authedUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id;
        case LOGOFF_AUTHED_USER:
            return initialState;
        default:
            return state;
    }
};
export default authedUser;

//------ACTIONS-----//
export const setAuthedUser = (id) => {
    return {
        type: SET_AUTHED_USER,
        id,
    };
};
export const logOffAuthUser = () => {
    return {
        type: LOGOFF_AUTHED_USER,
    };
};
