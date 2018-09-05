import { empreendForm, processForm, rtForm } from './formConfig';

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
    loadedData: [],
    empMatch: '',
    rtMatch: ''

}

const CadReducer = (state = initState, action) => {

    switch (action.type) {
        case 'LOAD_EMP_DATA':
            return { ...state, empCollection: action.payload }
            
        case 'LOAD_RT_DATA':
            return { ...state, rtCollection: action.payload }

        case 'LOAD_PROCESS_DATA':
            return { ...state, processCollection: action.payload }


        default:
            return state
    }
}

export default CadReducer;