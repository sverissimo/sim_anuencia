export const getTecnico = (tecnicos) => {

    const loggedUser = localStorage.getItem('name') + ' ' + localStorage.getItem('surName')
    if (tecnicos) {
        const tecnico = tecnicos.filter(el => `${el.name} ${el.surName}`.match(loggedUser))[0]
        return tecnico
    } else {
        return loggedUser
    }
}