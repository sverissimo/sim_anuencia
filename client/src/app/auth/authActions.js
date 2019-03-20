export function login(user) {
    return {
        type: 'LOGIN',
        payload: user
    }
}

export function signup(user) {
    const data = () => {
       
    }
    return {
        type: 'SIGNUP',
        payload: data
    }
}

export function logout() {
    return {
        type: 'LOG_OUT',
        payload: false
    }
}