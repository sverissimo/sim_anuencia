import axios from 'axios';
import formatEmail from '../config/formatEmail'

export const sendMail = async (email, emailRt, empName, modalidade, nomeEmpreendimento, munEmpreendimento, status, reload) => {
    await axios.post('/api/mail', {
        to: `${email}, ${emailRt}`,
        subject: `Atualização do processo ${nomeEmpreendimento} - ${status}`,
        html: formatEmail(empName, modalidade, nomeEmpreendimento, munEmpreendimento, status),
    }).then(res => console.log(res))
}