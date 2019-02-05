import axios from 'axios';
import { loadProcessData } from './../cadastro/cadActions';

export function setDate(date, itemId, event) {

    return dispatch => {                
        axios.put(('/api/editProcess/'), {
            _id: itemId,
            item: {                
                [event]: date
            }
        })
            .then(dispatch(loadProcessData()))
    }
};