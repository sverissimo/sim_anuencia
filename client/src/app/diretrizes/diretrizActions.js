import axios from 'axios';
import { loadProcessData } from './../cadastro/cadActions';


export function setCgtDate(date, itemId) {

    return dispatch => {
        axios.put(('/api/editProcess/'), {
            item: {
                _id: itemId,
                cgt: date
            }
        })
            .then(dispatch(loadProcessData()))
    }
};

export function setVistoriaDate(date, itemId) {

    return dispatch => {
        axios.put(('/api/editProcess/'), {
            item: {
                _id: itemId,
                vistoria: date
            }
        })
            .then(dispatch(loadProcessData()))
    }
};

