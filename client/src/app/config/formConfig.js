export const processForm = {
    nomeEmpreendimento: {
        divClassName: 'input-field col s12 m6 l4',
        type: 'text',
        name: 'nomeEmpreendimento',
        label: 'Nome do Empreendimento:',
        onBlur: null
    },
    area: {
        divClassName: 'input-field col s12 m4 l2',
        type: 'text',
        name: 'area',
        label: 'Área total da Gleba (m²):',
        onBlur: null
    }
}

export const rtForm = {

    phoneRt: {
        divClassName: 'input-field col s12 m6 l2',
        type: 'text',
        name: 'phoneRt',
        label: 'Telefone',
        onBlur: null
    },
    emailRt: {
        divClassName: 'input-field col s12 m6 l4',
        type: 'text',
        name: 'emailRt',
        label: 'E-mail',
        onBlur: null
    }
}

export const empreendForm = {
    cpf: {
        divClassName: 'input-field col s12 m3 l2',
        type: 'text',
        name: 'cpf',
        label: 'CPF / CNPJ',
    },
    phone: {
        divClassName: 'input-field col s12 m3 l2',
        type: 'text',
        name: 'phone',
        label: 'Telefone',
    },
    email: {
        divClassName: 'input-field col s12 m6 l3',
        type: 'email',
        name: 'email',
        label: 'E-mail',
    },
    CEP: {
        divClassName: 'input-field col s12 m3 l1',
        type: 'text',
        name: 'cep',
        label: 'CEP',
    },
    numero: {
        divClassName: 'input-field col s12 m3 l1',
        type: 'text',
        name: 'numero',
        label: 'Número',
    },
    complemento: {
        divClassName: 'input-field col s12 m3 l2',
        type: 'text',
        name: 'complemento',
        label: 'Complemento',
    },
    rua: {
        divClassName: 'input-field col s12 m6 l3',
        type: 'text',
        name: 'rua',
        label: 'Rua',
    },
    bairro: {
        divClassName: 'input-field col s12 m3 l2',
        type: 'text',
        name: 'bairro',
        label: 'Bairro',
    },
    cidade: {
        divClassName: 'input-field col s12 m4 l2',
        type: 'text',
        name: 'cidade',
        label: 'Cidade',
    },
    uf: {
        divClassName: 'input-field col s12 m3 l1',
        type: 'text',
        name: 'uf',
        label: 'Estado',
    }
}

export const modalidade = {
    
        divClassName: 'input-field col s12 m4 l2',        
        name: 'modalidade',
        label: 'Modalidade:',
        options: ['', 'Desmembramento', 'Loteamento']
        
    
}
export const municipios = {
    munEmpreendimento: {
        divClassName: 'input-field col s12 m4 l2',
        type: 'text',
        name: 'munEmpreendimento',
        label: 'Município:',
        options: ['', 'Baldim', 'Belo Horizonte', 'Betim', 'Brumadinho', 'Caeté', 'Capim Branco', 'Confins',
            'Contagem', 'Esmeraldas', 'Florestal', 'Ibirité', 'Igarapé', 'Itaguara', 'Itatiaiuçu', 'Jaboticatubas',
            'Juatuba', 'Lagoa Santa', 'Mário Campos', 'Mateus Leme', 'Matozinhos', 'Nova Lima', 'Nova União',
            'Pedro Leopoldo', 'Raposos', 'Ribeirão das Neves', 'Rio Acima', 'Rio Manso', 'Sabará', 'Santa Luzia',
            'São Joaquim de Bicas', 'São José da Lapa', 'Sarzedo', 'Taquaraçu de Minas', 'Vespasiano']
    }
}