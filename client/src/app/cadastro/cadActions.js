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


export function loadRtData() {

    const request = axios.get('/api/showRt')
        .then(res => res.data)
        .catch(err => console.log(err))
    return {
        type: 'LOAD_RT_DATA',
        payload: request
    }
};

export function loadProcessData() {

    const request = axios.get('/api/showProcess')
        .then(res => res.data)
        .catch(err => console.log(err))
    return {
        type: 'LOAD_PROCESS_DATA',
        payload: request
    }
};



/* export function changeHandler(event)  {
    event.preventDefault();

    return {
        type: 'CHANGED_VALUE',
        payload: event.target.value
    }
    let autoComplete = event.target.value

    let dataMatch = []
    dataMatch = getstate().items.filter(el => el.nome.toLowerCase().match(autoComplete.toLowerCase()))
    if (autoComplete && dataMatch[0]) {
        return {
            type: 'EMPREEND_MATCH',
            payload: {[event.target.name]: event.target.value, dataMatch: dataMatch}
        }

    } else {
        dataMatch = ''
        return {
            type: 'NO_EMP_MATCH',
            payload: {[event.target.name]: event.target.value, dataMatch: ''}
        }
    }
}; */
