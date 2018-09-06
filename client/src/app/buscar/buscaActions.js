import axios from 'axios';
import { loadEmpData, loadRtData, loadProcessData } from './../cadastro/cadActions';

export function deleteEmp(itemId, dispatch) {
    return dispatch => {
        axios.delete('/api/deleteEmp/' + itemId)
            .then(dispatch(loadEmpData()))
    }
}

export function deleteRt(itemId, dispatch) {
    return dispatch => {
        axios.delete('/api/deleteRt/' + itemId)
            .then(dispatch(loadRtData()))
    }
}

export const deleteProcess = (itemId, dispatch) => {
    return dispatch => {
        axios.delete('/api/deleteProcess/' + itemId)
            .then(dispatch(loadProcessData()))
    }
}