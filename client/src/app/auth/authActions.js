import axios from 'axios'

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

export function verify(confirmation) {
    localStorage.setItem('verified', confirmation)
    return {
        type: 'VERIFY',
        payload: confirmation
    }

}

export function getUsers() {

    
    const getUsers = axios.get('/api/users')
        .then(res => res.data)
        .catch(err => console.log(err))
    
    return {
        type: 'GET_USERS',
        payload: getUsers
    }

}

