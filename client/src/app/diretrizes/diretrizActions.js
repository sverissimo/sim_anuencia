import axios from 'axios';
import { loadProcessData } from './../cadastro/cadActions';
import { logout } from '../auth/logout'

export function setDate(date, itemId, event) {

    return async dispatch => {
        try {

            await axios.put(('/api/editProcess/'), {
                item: {
                    _id: itemId,
                    [event]: date
                }
            })
                .then(dispatch(loadProcessData()))
        }
        catch (err) {
            console.log(err)
            dispatch(logout(false))
        }
    }
};