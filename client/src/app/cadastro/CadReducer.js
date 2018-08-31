import { empreendForm, processForm, rtForm } from './formConfig';

const initState = {
    empreendForm: empreendForm,
    processForm: processForm,
    rtForm: rtForm,
    empCollection: [],
    rtCollection: [],
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
    openProcess: false,
    nProcesso: '',
    loadedData: [],
    empMatch: '',
    rtMatch: ''

}

const CadReducer = (state = initState, action) => {

    switch (action.type) {

        case 'LOAD_RT_DATA':
            return { ...state, rtCollection: action.payload }
        case 'CHANGED_VALUE':
            
            return {...state, nome:action.payload}
            
        default:
            return state
    }
}

export default CadReducer;