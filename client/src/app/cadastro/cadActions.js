import axios from 'axios';
import { toastr } from 'react-redux-toastr'

export const loadEmpData = () => {

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

export function loadFilesData() {

    const request = axios.get('/api/files')
        .then(res => res.data)
        .catch(err => console.log(err))
    return {
        type: 'LOAD_FILES_DATA',
        payload: request
    }
};

export const setColor = () => {

    const array = ['rgb(104, 119, 133)', 'rgb(84, 104, 102)', 'rgb(105, 117, 153)',
        'rgb(88, 103, 88)', 'rgb(117, 116, 101)', 'rgb(117, 117, 137)']
    let color = array[Math.floor(Math.random() * array.length)]
    return {
        type: 'SET_COLOR',
        payload: color
    }
}

export const reduxToastr = (status, input) => {
    if (status === 'sucess') {
        return toastr.success('Operação realizada com sucesso', input)
    } else {
        return toastr.error('erro', input)
    }
}