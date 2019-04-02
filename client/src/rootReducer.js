import { combineReducers } from 'redux';
import CadReducer from './app/cadastro/CadReducer';
import BuscaReducer from './app/buscar/BuscaReducers';
import { reducer as toastrReducer } from 'react-redux-toastr'
import AuthReducer from './app/auth/authReducer';


const rootReducer = combineReducers({
    
    auth: AuthReducer,
    cadastro: CadReducer,
    busca: BuscaReducer,
    toastr: toastrReducer
    
})

export default rootReducer;