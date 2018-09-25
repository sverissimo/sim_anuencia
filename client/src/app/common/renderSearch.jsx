import React from 'react';

const renderSearch = (search, collection, onSelect, checked) => {

    if (search && search.length > 0)
        return search.map((item, k) => {

            let empName
            let itemArray = []
            let empreend = collection.filter(emp => emp._id.match(item.empId))

            for (let keys in empreend) {
                empName = {
                    key: keys,
                    values: empreend[keys]
                }
            }
            for (let keys in item) {
                itemArray.push({
                    key: keys,
                    values: item[keys]
                })
            }
            let i2 = itemArray.slice(0, 5)
            console.log(!checked)
            //console.log(k)
            return (
                <div className="row teal lighten-5">
                    {i2.map((field, i) => field.key !== '_id' ? <div key={i} className="col s2"> {field.values} </div> : void 0)}
                    {empName ? <div className="col s2"> {empName.values.nome} </div> : <div className="col s2"> </div>}
                    <input id={k}
                        type="radio"
                        name="group1"
                        onClick={onSelect}
                        value={i2.map(field => field.key === '_id' ? `${field.values}` : void 0)}
                        checked={checked}
                    />
                    <label htmlFor={k}>{k}</label>
                </div>
            )
        }
        )
};

export default renderSearch;