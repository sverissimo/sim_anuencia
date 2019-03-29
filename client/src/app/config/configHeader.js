const prefeitura = [
    {
        endPoint: '/cadastro',
        label: 'Cadastro'
    },
    {
        endPoint: '/solicitaDiretriz',
        label: 'Solicitar Diretrizes Metropolitanas',
        item: 'Processo cadastrado'
    },
    {
        endPoint: '/solicitaAnuencia',
        label: 'Solicitar Anuência Prévia',
        item: 'Diretrizes Metropolitanas emitidas',
    },
    {
        endPoint: '/showEmpreend',
        label: 'Gerenciar Dados'
    }]

const agencia = [
    {
        endPoint: '/diretrizes',
        label: 'Diretrizes Metropolitanas',
        item: 'Aguardando Diretrizes Metropolitanas'
    },
    {
        endPoint: '/Anuencia',
        label: 'Analisar Processo',
        item: 'Aguardando Análise'
    },
    {
        endPoint: '/showEmpreend',
        label: 'Gerenciar Dados'
    }]

const admin = [prefeitura[0], prefeitura[1], agencia[0], prefeitura[2], agencia[1],
{
    endPoint: '/showEmpreend',
    label: 'Gerenciar Dados'
}]

const empreend = [
{
    endPoint: '/showEmpreend',
    label: 'Gerenciar Dados'
}]


export const configHeader = (role) => {

    switch (role) {
        case 'prefeitura':
            return prefeitura
        case 'tecnico':
            return agencia
        case 'admin':
            return admin
        case 'empreend':
            return empreend
            
        default:
            return
    }
}



