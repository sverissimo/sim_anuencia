export function login(conf) {
    return {
        type: 'LOGIN',
        payload: conf
    }
}

export function logout(logout) {
    localStorage.clear('login', false)
    return {
        type: 'LOG_OUT',
        payload: logout
    }
}