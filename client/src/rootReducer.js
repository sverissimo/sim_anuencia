import { combineReducers } from 'redux';
import CadReducer from './app/cadastro/CadReducer';

const rootReducer = combineReducers({
    
    
    cadastro: CadReducer
})

export default rootReducer;