import { empreendForm, processForm, rtForm } from './formConfig';

const initState = {
    empreendForm: empreendForm,
    processForm: processForm,
    rtForm: rtForm,
    items: [],
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
    dataMatch: '',

}

const CadReducer = (state = initState, action) => {

    switch (action.type) {

        case 'LOAD_EMP_DATA':
            return { ...state, items: action.payload }
        case 'CHANGED_VALUE':
            
            return {...state, nome:action.payload}
            
        default:
            return state
    }
}

export default CadReducer;