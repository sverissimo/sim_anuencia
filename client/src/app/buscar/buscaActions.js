import axios from 'axios';
import { loadEmpData, loadRtData, loadProcessData } from './../cadastro/cadActions';
import { logout } from '../auth/logout';

export function deleteEmp(itemId, dispatch) {
    return dispatch => {
        axios.delete('/api/deleteEmp/' + itemId)
            .then(dispatch(loadEmpData()))
            .catch(err => logout(err))
    }
}

export function deleteRt(itemId, dispatch) {
    return dispatch => {
        axios.delete('/api/deleteRt/' + itemId)
            .then(dispatch(loadRtData()))
            .catch(err => logout(err))
    }
}

export const deleteProcess = (itemId, dispatch) => {
    return dispatch => {
        axios.delete('/api/deleteProcess/' + itemId)
            .then(dispatch(loadProcessData()))
            .catch(err => logout(err))
    }
}

export function disableEdit() {
    return {
        type: 'DISABLE_EDIT',
    }
}

export function handleEdit(itemId) {
    return {
        type: 'FIND_EMP_ID',
        payload: itemId
    }
}

export function changeHandler(e) {
    return {
        type: 'CHANGE_SEARCH_VALUE',
        payload: e
    }
}

export function editValue(val) {
    return {
        type: 'EDIT_VALUE',
        payload: val
    }
}