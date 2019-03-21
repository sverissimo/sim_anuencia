import { reduxToastr } from '../cadastro/cadActions';

export const logout = async (err) => {    
    await localStorage.clear()
    let error = err || ''
    console.log(error)
    reduxToastr('Erro!', 'Sessão expirada.')
    setTimeout(() => {
        window.location.reload()
    }, 1900);
}
