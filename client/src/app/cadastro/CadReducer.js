const initState = {
    empCollection: [],
    rtCollection: [],
    processCollection: [],
    filesCollection: [],
    tecCollection: [],
    id: '',
    nome: '',
    cpf: '',
    rua: '',
    bairro: '',
    cep: '',
    cidade: '',
    phone: '',
    email: '',
    numero: '',
    complemento: '',
    uf: '',
    nomeRt: '',
    emailRt: '',
    phoneRt: '',
    nProcesso: '',
    loadedData: {},
    empMatch: '',
    rtMatch: '',
    empId: '',
    editItem: false,
    search: '',
    setColor: ''

}

const CadReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOAD_EMP_DATA':
            return { ...state, empCollection: action.payload }

        case 'LOAD_RT_DATA':
            return { ...state, rtCollection: action.payload }

        case 'LOAD_PROCESS_DATA':
            return { ...state, processCollection: action.payload }

        case 'LOAD_FILES_DATA':
            return { ...state, filesCollection: action.payload }

        case 'LOAD_TECNICOS':
            return { ...state, tecCollection: action.payload }

        case 'SET_COLOR':
            return { ...state, setColor: action.payload }

        default:
            return state
    }
}

export default CadReducer;