const initialState = {
    username: '',
    password: '',
    profile_pic: ''
}

const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";

function reducer(state=initialState, action) {
    switch(action.type){
        case UPDATE_CURRENT_USER:
            return action.payload;
        default: return state;
    }
}

export function updateCurrentUser(username, password, profile_pic){
    return {
        type: UPDATE_CURRENT_USER,
        payload: {username, password, profile_pic}
    };
}

export default reducer;