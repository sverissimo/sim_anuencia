import { empreendForm, processForm, rtForm } from './../common/formConfig';

const initState = {
    empreendForm: empreendForm,
    processForm: processForm,
    rtForm: rtForm,
    empCollection: [],
    rtCollection: [],
    processCollection: [],
    id: '',
    nome: '',
    cpf: '',
    birth: '',
    phone: '',
    cep: '',
    numero: '',
    complemento: '',
    email: '',
    rua: '',
    bairro: '',
    cidade: '',
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
    search: ''

}

const CadReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOAD_EMP_DATA':
            return { ...state, empCollection: action.payload }

        case 'LOAD_RT_DATA':
            return { ...state, rtCollection: action.payload }

        case 'LOAD_PROCESS_DATA':
            return { ...state, processCollection: action.payload }

        case 'FIND_EMP_ID':
            return { ...state, empId: action.payload, editItem: true }

        case 'DISABLE_EDIT':
            return { ...state, editItem: false }

        case 'CHANGE_SEARCH_VALUE':
            return { ...state, search: action.payload }

        case 'EDIT_VALUE':
            return { ...state, loadedData: action.payload }




        default:
            return state
    }
}

export default CadReducer;