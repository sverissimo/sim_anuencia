const initialState = {}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, login: true, user: action.payload }

        case 'SIGNUP':
            return { ...state, login: true, user: action.payload }

        case 'LOG_OUT':
            return { ...state, login: action.payload, user: null }

        default:
            return state
    }
}

export default authReducer