import React from 'react';
import { configLabels } from '../config/configLabels';
import fieldConfig from '../config/fieldConfig'
import IF from './conditionalRender'

const RenderSearch = (props) => {
    let { search, collection, rtCollection, processCollection, onSelect, checked, fields, color, renderEmp,
        renderRt, empDetails, rtDetails, showFiles, ocultarArquivos } = props

    let solDirObjFiles = []
    let sdFilesArray = []
    void sdFilesArray
    if (processCollection && processCollection[0]) {

        for (let key in processCollection) {
            processCollection[key].solDirFiles && processCollection[key].solDirFiles.length > 0 ?
                solDirObjFiles.push(processCollection[key].solDirFiles) : void 0
        }
        sdFilesArray = solDirObjFiles[0]
    }

    //****************** HEADER *********************

    let fieldsConfig = []
    fields.map(i => fieldsConfig.push({
        name: configLabels[i].name,
        label: configLabels[i].label,
        div: configLabels[i].div
    }))

    return (
        <div>
            {
                search.length > 0 ?
                    <div className="row tableHeader" style={{ backgroundColor: color }}>
                        {fieldsConfig.map((field, i) => <IF cond={field.name !== '_id'} value={field.label} div={field.div} key={i} />)}
                        <IF cond={renderEmp} value='Interessado' div='col s2' />
                        <IF cond={renderRt} value='RT' />
                        <IF cond={!ocultarArquivos} value='Arquivos' />
                        <div className="col s1">
                            Selecionar
                        </div>
                    </div> : null
            }

            {/* ***************** BODY / ROWS ***************** */}
            {
                search.length > 0 ?
                    search.map((item, k) => {

                        let itemArray = []
                        let empreend = collection.filter(emp => emp._id.match(item.empId))[0]
                        let rt = rtCollection.filter(rt => rt._id.match(item.rtId))[0]

                        for (let keys in item) {
                            itemArray.push({
                                key: keys,
                                values: item[keys]
                            })
                        }
                        let i2 = []
                        fields.map(i => i2.push(itemArray[i]))

                        return (
                            <div className="row" key={k} >
                                {
                                    i2.map((field, i) =>
                                        field.key !== '_id' ?
                                            !isNaN(Date.parse(field.values)) && String(field.values).length > 15 ?
                                                <div key={i} className={fieldConfig(field.key, 'div')}>
                                                    {new Date(field.values).getDate()}/{new Date(field.values).getMonth() + 1}/{new Date(field.values).getFullYear()}
                                                </div> :
                                                <div key={i} className={fieldConfig(field.key, 'div')} style={{ wordBreak: 'break-word' }}>
                                                    {field.values}
                                                </div>
                                            : null
                                    )
                                }
                                {
                                    empreend ? <IF cond={[empreend, renderEmp]} div='col s2'>
                                        <span id={empreend._id} className='link' onClick={empDetails}>
                                            {empreend.nome}
                                        </span>
                                    </IF> : < div className='col s1'> </div>
                                }
                                {
                                    rt ? <IF cond={[rt, renderRt]} div='col s1'>
                                        <span id={rt._id} className='link' onClick={rtDetails}>
                                            {rt.nomeRt}
                                        </span>
                                    </IF> : <div className='col s1'> </div>
                                }
                                <IF cond={!ocultarArquivos} div='col s1'>
                                    <span id={`${item._id}z`} className='link' onClick={showFiles}>
                                        Ver arquivos
                                    </span>
                                </IF>

                                <div className="col s1 center">
                                    <input id={item._id}
                                        type="radio"
                                        name="group1"
                                        onClick={onSelect}
                                        value={i2.map(field => field.key === '_id' ? `${field.values}` : void 0)}
                                        defaultChecked={checked === item._id}
                                    />
                                    <label htmlFor={item._id}> </label>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div style={{ textAlign: 'center', padding: '4% 0' }}>
                        <strong>
                            Nenhum processo encontrado.
                        </strong>
                    </div>
            }
        </div >
    )
};

export default RenderSearch;