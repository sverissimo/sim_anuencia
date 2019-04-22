import React from 'react';
import { Input } from 'react-materialize'
import { modalidade, municipios } from '../config/formConfig'

let selector = municipios.munEmpreendimento.options.map((opt, i) =>
    <option key={i} value={opt}>{opt}</option>
)

let modal = modalidade.options.map((opt, i) =>
    <option key={i} value={opt}>{opt}</option>
)

const EditData = (props) => {

    const renderFields = () => {
        if (props.data.edit && props.data.item) {
            let itemEdit = props.data.item

            let itemArray = []

            for (let keys in itemEdit) {
                itemArray.push({
                    key: keys,
                    value: itemEdit[keys],
                })
            }

            function removeLast(arr, n) {
                arr.splice(arr.length - n, arr.length);
                return arr;
            }
            let filterArray = itemArray

            if (props.data.select === 'emp' && itemArray.length > 14) filterArray = removeLast(itemArray, 3)
            if (props.data.select === 'rt' && itemArray.length > 5) filterArray = removeLast(itemArray, 3)
            if (props.data.select === 'rt' && itemArray.length === 5) filterArray = removeLast(itemArray, 1)
            if (props.data.select === 'process') {
                filterArray = removeLast(itemArray.slice(2), 9)
                filterArray.push(itemArray.filter(e=> e.key ==='nProcess')[0])
            }
                     
            return filterArray.map((item, i) =>

                item.key === '_id' ?
                    void 0
                    : item.key === 'modalidade' ?
                        <div className="col s2" key={i + 100} >
                            <Input
                                name='modalidade'
                                type='select'
                                label='Modalidade'
                                defaultValue={props.data.item[item.key]}
                                onChange={props.change}
                            >
                                {modal}
                            </Input>
                        </div>
                        : item.key === 'munEmpreendimento' ?
                            <div className="col s4" key={i + 200}>
                                <Input
                                    name='munEmpreendimento'
                                    type='select'
                                    label='Município'
                                    defaultValue={props.data.item[item.key]}
                                    onChange={props.change}
                                >
                                    {selector}
                                </Input>
                            </div>
                            :
                            <div key={i} className="input-field col s3" >
                                <label className="active">{item.key.replace(/\w/, c => c.toUpperCase())}</label>
                                <input
                                    type="text"
                                    className="active"
                                    name={item.key}
                                    value={props.data.item[item.key]}
                                    onChange={props.change} />
                            </div>
            )
        } else {
            return null
        }
    }

    if (props.data.edit && props.data.item) {
        return (
            <form onSubmit={props.submit} id={`${props.data.select}`} >
                {renderFields()}
            </form>
        )
    } else {
        return null
    }
}

export default EditData;