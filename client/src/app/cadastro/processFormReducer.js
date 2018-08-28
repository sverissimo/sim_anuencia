import { processForm } from './formConfig';

const processFormReducer = (state = processForm, action) => {

    switch (action.type) {
        case 'FORM_PROCESS':
            return { ...state, processForm: action.payload }
        default:
            return state
    }
}


export default processFormReducer;