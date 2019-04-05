export const getTecnico = (tecnicos) => {

    const loggedUser = localStorage.getItem('name') + ' ' + localStorage.getItem('surName')
    const userEmail = localStorage.getItem('email')
    const tecnicoAgencia = tecnicos.filter(el => el.email.match(userEmail))[0]

    if (tecnicoAgencia) {
        
        return tecnicoAgencia.name+' '+tecnicoAgencia.surName
    } else {
        return loggedUser
    }
}