import axios from 'axios';
import formatEmail from '../config/formatEmail'

export const sendMail = async (email, emailRt, empName, modalidade, nomeEmpreendimento, munEmpreendimento, status) => {
    await axios.post('/api/mail', {
        to: `${email}, ${emailRt}`,
        subject: `Atualização do processo ${nomeEmpreendimento} - Diretrizes Metropolitanas solicitadas`,
        html: formatEmail(empName, modalidade, nomeEmpreendimento, munEmpreendimento, status),
    }).then(res => console.log(res))

    setTimeout(() => {
        window.location.reload()
    }, 1500)
}