const dataFilter = (user, collection) => {

    if (user.role === 'empreend') {
        let filteredData = collection.filter(doc => doc.email.match(user.email))
        return filteredData
    }

    if (user.role === 'prefeitura') {
        let filteredData = collection.filter(doc => doc.munEmpreendimento.match(user.municipio))
        if (2 === 2) {
            let emps = []
            filteredData.forEach(proc => {
                this.empreendedor.findOne({ '_id': proc.empId }, (err, doc) => {
                    emps.push(doc)
                })             
            })
            console.log(emps)
        }
    }


}

module.exports = { dataFilter }