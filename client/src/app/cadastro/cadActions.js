import axios from 'axios';

export const loadEmpData= () => {

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

export function setColor(color) {
    
      return {
        type: 'SET_COLOR',
        payload: color
    }
};