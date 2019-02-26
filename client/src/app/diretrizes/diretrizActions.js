import axios from 'axios';
import { loadProcessData } from './../cadastro/cadActions';

export function setDate(date, itemId, event) {

    return async dispatch => {
        await axios.put(('/api/editProcess/'), {
            _id: itemId,
            item: {
                [event]: date
            }
        })
        dispatch(loadProcessData())
    }
};