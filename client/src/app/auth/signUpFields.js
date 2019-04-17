const signUpFields = [
    {
        name: 'name',
        className: 'mdi-action-account-circle prefix',
        label: 'Nome'
    },
    {
        name: 'surName',
        className: 'mdi-action-account-circle prefix',
        label: 'Sobrenome'
    },
    {
        name: 'email',
        className: 'mdi-communication-email prefix',
        label: 'E-mail'
    },
    {
        name: 'municipio',
        className: 'mdi-action-account-circle prefix',
        label: 'Município'
    },   
    {
        name: 'password',
        className: 'mdi-action-lock-outline prefix',
        label: 'Senha'
    },
    {
        name: 'confirmPassword',
        className: 'mdi-action-lock-outline prefix',
        label: 'Confirme sua senha'
    },
    {
        name: 'role',
        className: 'mdi-action-account-circle prefix',
        label: 'Área de Atuação',
        options: ['Poder público', 'Iniciativa privada']
    }
]

export default signUpFields