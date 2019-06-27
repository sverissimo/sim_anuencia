export const configLabels = [
    {
        name: 'processHistory',
        label: 'Histórico do Processo',
        div: 'col s1'
    },
    {
        name: '_id',
        label: 'ID',
        div: 'col s3'
    },
    {
        name: 'nProcess',
        label: 'Num. do processo',
        div: 'col s1'
    },
    {
        name: 'nomeEmpreendimento',
        label: 'Nome do empreendimento',
        div: 'col s2'
    },
    {
        name: 'modalidade',
        label: 'Modalidade',
        div: 'col s1'
    },
    {
        name: 'area',
        label: 'Área (m²)',
        div: 'col s1'
    },
    {
        name: 'munEmpreendimento',
        label: 'Município',
        div: 'col s1'
    },
    {
        name: 'status',
        label: 'Status do processo',
        div: 'col s1'
    },
    {
        name: 'tecnico',
        label: 'Técnico da Agência',
        div: 'col s1'
    },
    {
        name: 'cgt',
        label: 'Data da CGT',
        div: 'col s1'
    },
    {
        name: 'vistoria',
        label: 'Data da Vistoria',
        div: 'col s1'
    },
    {
        name: 'daeDir',
        label: 'DAE - Diretrizes',
        div: 'col s1'
    },
    {
        name: 'daeAnuencia',
        label: 'DAE - Anuência',
        div: 'col s1'
    },
    {
        name: 'empId',
        label: 'EmpId',
        div: 'col s1'
    },
    {
        name: 'rtId',
        label: 'rtId',
        div: 'col s1'
    },
    {
        name: 'createdAt',
        label: 'Data de Criação',
        div: 'col s1'
    },
    {
        name: 'updatedAt',
        label: 'Atualizado em',
        div: 'col s1'
    },
    {
        name: '__v',
        label: 'version',
        div: 'col s1'
    },
]

export const solDirConfig = [
    {
        label: 'Diretrizes Municipais',
        nameInput: 'dirMunFile'
    },
    {
        label: 'Delimitação da área do empreendimento (em formato kml)',
        nameInput: 'kml',
        map: true,
        tooltip: 'Clique para delimitar a área do empreendimento no mapa',
    },
    {
        label: 'Levantamento Planialtimétrico (em formato DWG)',
        nameInput: 'levPlanFile'
    },
    {
        label: 'Cópia do boleto e comprovante de pagamento da DAE',
        nameInput: 'dirDaeFile',
        tooltip: 'Clique para obter informações sobre o cálculo e pagamento do Documento de Arrecadação Estadual (DAE)',
        tt: true,
        link: true
    },
]

export const configEmpLabels = [
    {
        name: '_id',
        label: 'ID',
        div: 'col s1'
    },
    {
        name: 'nome',
        label: 'Nome',
        div: 'col s2'
    },
    {
        name: 'cpf',
        label: 'CPF',
        div: 'col s2'
    },
    {
        name: 'rua',
        label: 'Rua',
        div: 'col s3'
    },
    {
        name: 'bairro',
        label: 'Bairro',
        div: 'col s1'
    },
    {
        name: 'cep',
        label: 'CEP',
        div: 'col s1'
    },
    {
        name: 'cidade',
        label: 'Cidade',
        div: 'col s2'
    },
    {
        name: 'phone',
        label: 'Telefone',
        div: 'col s1'
    },
    {
        name: 'email',
        label: 'E-mail',
        div: 'col s2'
    },
    {
        name: 'numero',
        label: 'Número',
        div: 'col s1'
    },
    {
        name: 'complemento',
        label: 'Complemento',
        div: 'col s1'
    },

]

export const configRtLabels = [
    {
        name: '_id',
        label: 'ID',
        div: 'col s1'
    },
    {
        name: 'nomeRt',
        label: 'Nome',
        div: 'col s1'
    },
    {
        name: 'emailRt',
        label: 'E-mail',
        div: 'col s2'
    },
    {
        name: 'phoneRt',
        label: 'Telefone',
        div: 'col s2'
    },
]

export const solAnuenciaConfig1 = [
    {
        nameInput: 'regImovel',
        label: 'Registro do Imóvel',
        tooltip: 'Certidão de Registro do Imóvel com negativa de ônus, emitida em até 30 dias antes da entrada do processo na Prefeitura Municipal.'
    },
    {
        nameInput: 'CNDOnus',
        label: 'Certidão Negativa de ônus reais',
        tooltip: 'Certidão Negativa de ônus reais.'
    },
    {
        nameInput: 'CNDMun',
        label: 'Certidão Negativa de tributos municipais',
        tooltip: 'Certidão Negativa de tributos municipais.'
    },
    {
        nameInput: 'empRG',
        label: 'Fotocópia da Identidade do proprietário',
        tooltip: 'Fotocópia da Identidade do proprietário; no caso de pessoa jurídica, fotocópia do contrato social e de suas alterações.'
    },
    {
        nameInput: 'art',
        label: 'ART com comprovante de pagamento',
        tooltip: 'ART referente ao projeto com comprovante de pagamento'
    },
    {
        nameInput: 'decConform',
        label: 'Declaração de conformidade',
        tooltip: 'Documento emitido pela Prefeitura Municipal declarando a conformidade do parcelamento com a legislação municipal'
    },
    {
        nameInput: 'daeAnuencia',
        label: 'Cópia do boleto e comprovante de pagamento da DAE',
        tooltip: 'Clique para obter informações sobre o cálculo e pagamento do Documento de Arrecadação Estadual (DAE)',
        tt: true,
        link: true
    },
    {
        nameInput: 'memDescritivo',
        label: 'Memorial descritivo',
        tooltip: 'Descrição sucinta do loteamento com suas características, áreas públicas, equipamentos etc. '
    },
    {
        nameInput: 'memDescTp',
        label: 'Memorial Descritivo do Projeto de Terraplenagem',
        tooltip: 'O memorial deverá conter a determinação da inclinação dos taludes de corte e aterro e a caracterização do tipo de solo.'
    },
    {
        nameInput: 'cemig',
        label: 'Certidão da Cemig',
        tooltip: 'Cemig'
    },
    {
        nameInput: 'dtbCopasa',
        label: 'Diretriz Técnica Básica (Copasa)',
        tooltip: 'O memorial deverá conter a determinação da inclinação dos taludes de corte e aterro e a caracterização do tipo de solo.'
    },
    {
        nameInput: 'licAmbental',
        label: 'Certidão / Licença ambiental',
        tooltip: 'Insira aqui a certidão de licença ambiental emitida pelo Estado ou pelo município, se for o caso.',
        tt: true
    },

]

export const solAnuenciaConfig2 = [
    {
        nameInput: 'levPlan',
        label: 'Levantamento Planialtimétrico',
        tooltip: 'mesma escala do Projeto Urbanístico, em sistema de coordenadas UTM e com delimitação e confrontantes compatíveis com a descrição da Certidão de Registro do imóvel'
    },
    {
        nameInput: 'mapaIso',
        label: 'Projeto Urbanístico com mapa de Isodeclividade',
        tooltip: 'Mapa de isodeclividade com intervalos 0 a 30%, 30 a 47% e acima de 47%'
    },
    {
        nameInput: 'projTer',
        label: 'Projeto de Terraplenagem',
        tooltip: 'Projeto na mesma escala do Projeto Urbanístico e em sistema de coordenadas UTM'
    },
    {
        nameInput: 'projDren',
        label: 'Projeto de Drenagem',
        tooltip: 'Projeto na mesma escala do Projeto Urbanístico e em sistema de coordenadas UTM'
    },
    {
        nameInput: 'projPdf',
        label: 'Projetos em PDF (extensão zip)',
        tooltip: 'Crie um arqivo extensão ".zip" contendo cada um dos projetos acima em PDF.',
        tt: 'true'
    },
    {
        nameInput: 'outros',
        label: 'Outros documentos (somente se solicitado)',
        tooltip: 'Caso sejam solicitados documentos adicionais, anexe aqui. '
    }
]

export const solDesmembConfig1 = [
    {
        nameInput: 'regImovel',
        label: 'Registro do Imóvel',
        tooltip: 'Certidão de Registro do Imóvel com negativa de ônus, emitida em até 30 dias antes da entrada do processo na Prefeitura Municipal.'
    },
    {
        nameInput: 'CNDMun',
        label: 'Certidão Negativa de tributos municipais',
        tooltip: 'Certidão Negativa de tributos municipais.'
    },
    {
        nameInput: 'empRG',
        label: 'Fotocópia da Identidade do proprietário',
        tooltip: 'Fotocópia da Identidade do proprietário; no caso de pessoa jurídica, fotocópia do contrato social e de suas alterações.'
    },
    {
        nameInput: 'art',
        label: 'ART com comprovante de pagamento',
        tooltip: 'ART referente ao projeto com comprovante de pagamento'
    },
    {
        nameInput: 'decConform',
        label: 'Declaração de conformidade',
        tooltip: 'Documento emitido pela Prefeitura Municipal declarando a conformidade do parcelamento com a legislação municipal'
    },
    {
        nameInput: 'daeAnuencia',
        label: 'Cópia do boleto e comprovante de pagamento da DAE',
        tooltip: 'Clique para obter informações sobre o cálculo e pagamento do Documento de Arrecadação Estadual (DAE)',
        tt: true,
        link: true
    },
    {
        nameInput: 'memDescritivo',
        label: 'Memorial descritivo',
        tooltip: 'Descrição sucinta do loteamento com suas características, áreas públicas, equipamentos etc. '
    }
]

export const solDesmembConfig2 = [

    {
        nameInput: 'projDesmemb',
        label: 'Projeto de Desmembramento',
    },
    {
        nameInput: 'projPdf',
        label: 'Projetos em PDF (extensão zip)',
        tooltip: 'Crie um arqivo extensão ".zip" contendo cada um dos projetos acima em PDF.',
        tt: 'true'
    },
    {
        nameInput: 'outros',
        label: 'Outros documentos (somente se solicitado)',
        tooltip: 'Caso sejam solicitados documentos adicionais, anexe aqui. '
    }
]

export const allFilesLabels = () => {

    let allFilesArray = []
    solDirConfig.forEach(element => {
        allFilesArray.push(element)
    })

    solAnuenciaConfig1.forEach(element => {
        allFilesArray.push(element)
    })

    solAnuenciaConfig2.forEach(element => {
        allFilesArray.push(element)
    })

    allFilesArray.push(
        {
            nameInput: 'diretrizFile',
            label: 'Diretrizes Metropolitanas',
        },
        {
            nameInput: 'notaTecnica',
            label: 'Nota Técnica',
        },
        {
            nameInput: 'anuenciaFile',
            label: 'Certidão de Anuência Metropolitana',
        },
        {
            nameInput: 'projDesmemb',
            label: 'Projeto de Desmembramento',
        },
    )
    return allFilesArray
};

export const fileLabel = (fieldName) => {

    let allFilesArray = []
    allFilesArray = allFilesLabels()
    let label = allFilesArray.filter(e => e.nameInput.match(fieldName))
    return label[0].label
}

