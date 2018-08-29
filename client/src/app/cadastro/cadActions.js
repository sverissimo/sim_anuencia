import axios from 'axios';


export function loadEmpData() {

    const request = axios.get('/api/showEmpreend')
        .then(res => res.data)
        .catch(err => console.log(err))
    return {
        type: 'LOAD_EMP_DATA',
        payload: request
    }
};


