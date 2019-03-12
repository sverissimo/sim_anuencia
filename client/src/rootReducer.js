import { combineReducers } from 'redux';
import CadReducer from './app/cadastro/CadReducer';
import BuscaReducer from './app/buscar/BuscaReducers';
import { reducer as toastrReducer } from 'react-redux-toastr'


const rootReducer = combineReducers({
    
    cadastro: CadReducer,
    busca: BuscaReducer,
    toastr: toastrReducer
    
})

export default rootReducer;