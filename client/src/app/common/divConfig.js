
const divConfig = (field) => {
    switch (field) {

        case 'nomeEmpreendimento':
            return 'col s2'
            
        case 'area':
            return 'col s3'
            
        case 'modalidade':
            return 'col s1'
            
        case 'munEmpreendimento':
            return 'col s2'
            
        case 'status':
            return 'col s3'
            
        default:
            return null
                ;
    }

};

export default divConfig;