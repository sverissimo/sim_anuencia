import { combineReducers } from 'redux';
import processFormReducer from './app/cadastro/processFormReducer';
import empreendFormReducer from './app/cadastro/empreendFormReducer';

const rootReducer = combineReducers({
    
    processForm: processFormReducer,
    empreendForm: empreendFormReducer
})

export default rootReducer;