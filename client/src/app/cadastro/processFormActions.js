import { processForm } from './formConfig';

export function processFormActions () {
    return {
    type: 'FORM_PROCESS',
    payload: processForm
    }
}

export default processFormActions;