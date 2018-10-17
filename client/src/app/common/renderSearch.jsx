import React from 'react';
import divConfig from '../common/divConfig'

const RenderSearch = (props) => {
    let { search, collection, onSelect, checked } = props
    if (search && search.length > 0) {


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

            let i2 = itemArray.slice(1, 6)

            
            return (
                <div className="row" key={k} >
                    {
                        i2.map((field, i) => field.key !== '_id' ?
                        
                            <div key={i} className={divConfig(field.key)}>
                                {field.values}
                            </div> : void 0)
                    }
                    {
                        empName ?
                            <div className="col s2">
                                {empName.values.nome}
                            </div> : <div className="col s2"> </div>
                    }
                    <input id={item._id}
                        type="radio"
                        name="group1"
                        onClick={onSelect}
                        value={i2.map(field => field.key === '_id' ? `${field.values}` : void 0)}
                        defaultChecked={checked === this.id}
                    />
                    <label htmlFor={item._id}>Selecionar</label>
                </div>
            )
        }
        )

    } else {
        return null
    }
};

export default RenderSearch;