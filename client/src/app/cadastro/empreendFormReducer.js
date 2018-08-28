import { empreendForm } from './formConfig';

const empreendFormReducer = (state = empreendForm, action) => {

    switch (action.type) {
        case 'FORM_PROCESS':
            return { ...state, empreendForm: action.payload }
        default:
            return state
    }
}


export default empreendFormReducer;