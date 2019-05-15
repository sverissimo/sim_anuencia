import { reduxToastr } from '../cadastro/cadActions';

const clearCookie = () => {

    const d = new Date(); //Create an date object
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24)); //Set the time to the past. 1000 milliseonds = 1 second
    const expires = "expires=" + d.toGMTString()
    document.cookie = '_sim-ad=; ' + expires

}

export const logout = async (err = ' ') => {

    await clearCookie()
    await localStorage.clear()
    reduxToastr('error!', err.toString(), 'Sessão expirada.')
    setTimeout(() => {
        window.location.reload()
    }, 1900);
}
