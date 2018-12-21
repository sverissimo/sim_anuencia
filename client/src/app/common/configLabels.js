export const configLabels = [

    {
        name: 'fileObjects',
        label: 'Arquivos',
        div: 'col s1'
    },
    
    {
        name: 'pendencias',
        label: 'Pendências',
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
        div: 'col s2'
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
        label: 'Levantamento Planialtimétrico',
        nameInput: 'levPlanFile'
    },
    {
        label: 'Comprovante de pagamento da DAE',
        nameInput: 'dirDaeFile'
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
        name: 'phoneRt',
        label: 'Telefone',
        div: 'col s2'
    },
    {
        name: 'emailRt',
        label: 'E-mail',
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
        label: 'Comprovante de pagamento da DAE',
        tooltip: 'Comprovante de pagamento da taxa de expediente para emissão de anuência prévia por meio de Documento de Arrecadação Estadual'
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
        label: 'AAF ou Licença Ambiental de Instalação',
        tooltip: 'Certidão de Dispensa (classe 1) Autorização Ambiental de Funcionamento (classe 3) ou LI (classe 5). '
    },

]

export const solAnuenciaConfig2 = [
    {
        nameInput: 'levPlan',
        label: 'Levantamento Planialtimétrico',
        tooltip: 'mesma escala do Projeto Urbanístico, em sistema de coordenadas UTM e com delimitação e confrontantes compatíveis com a descrição da Certidão de Registro do imóvel'
    },
    {
        nameInput: 'projUrb',
        label: 'Projeto Urbanístico',
        tooltip: 'Com coordenadas UTM, curvas de nível e escala de 1:25000'
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
            nameInput: 'anuenciaFile',
            label: 'Certidão de Anuência Metropolitana',
        }
    )
    return allFilesArray
};


