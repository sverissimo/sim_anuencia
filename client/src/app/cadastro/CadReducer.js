import { empreendForm, processForm } from './formConfig';

const initState = {
    empreendForm: empreendForm,
    processForm: processForm,
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
        default:
            return state
    }
}



export default CadReducer;