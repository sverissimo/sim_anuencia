const initialState = {
    login: false,
    verified: false,
    usersCollection: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, login: action.payload }

        case 'VERIFY':
            return { ...state, verified: action.payload }

        case 'GET_USERS':
            return { ...state, usersCollection: action.payload }

        case 'LOG_OUT':
            return { ...state, login: action.payload, user: null }



        default:
            return state
    }
}

export default authReducer