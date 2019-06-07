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

    const changeRtEmp = (empId, rtId) => {
        const { empCollection, rtCollection } = props.redux

        const empreend = empCollection.filter(emp => emp._id === empId)[0]
        const rt = rtCollection.filter(rt => rt._id === rtId)[0]        
        return (
            <div>
                <Input
                    name='empId'
                    type='select'
                    label='Empreendedor'
                    defaultValue={empreend.nome}
                    onChange={props.change}
                >
                    <option key='0' value={empreend._id}>{empreend.nome}, {empreend.cpf || ''}</option>
                    {empCollection.map((opt, i) => <option key={i} value={opt._id}>{opt.nome}, {opt.cpf || ''}</option>)}
                </Input>
                <Input
                    name='rtId'
                    type='select'
                    label='Responsável Técnico'
                    defaultValue={rt.nomeRt}
                    onChange={props.change}
                >
                    <option key='0' value={rt._id}>{rt.nomeRt}, {rt.emailRt || ''}</option>
                    {rtCollection.map((opt, i) => <option key={i} value={opt._id}>{opt.nomeRt}, {opt.emailRt || 'email não informado'}</option>)}
                </Input>
            </div>
        )
    }

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
                filterArray = itemArray.filter(el => ['nProcess', 'nomeEmpreendimento', 'modalidade', 'area', 'munEmpreendimento', 'tecnico'].includes(el.key))
            }
            
            return (
                <div>
                    {filterArray.map((item, i) =>

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
                    )}
                    {(props.data.select === 'process') && <div>
                        {changeRtEmp(props.data.item.empId, props.data.item.rtId)}
                    </div>}
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