import { combineReducers } from 'redux';
import CadReducer from './app/cadastro/CadReducer';
import BuscaReducer from './app/buscar/BuscaReducers';


const rootReducer = combineReducers({
    
    cadastro: CadReducer,
    busca: BuscaReducer,
    
})

export default rootReducer;