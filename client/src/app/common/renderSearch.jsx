import React from 'react';
import { configLabels, configEmpLabels, configRtLabels } from '../common/configLabels';
import fieldConfig from './fieldConfig'

const RenderSearch = (props) => {
    let { search, collection, rtCollection, processCollection, onSelect, checked, fields, color, renderEmp,
        renderRt, empDetails, rtDetails, download } = props


    let solDirObjFiles = []
    let sdFilesArray = []
    if (processCollection && processCollection[0]) {

        for (let key in processCollection) {
            processCollection[key].solDirFiles && processCollection[key].solDirFiles.length > 0 ?
                solDirObjFiles.push(processCollection[key].solDirFiles) : void 0
        }
        sdFilesArray = solDirObjFiles[2]
        console.log(sdFilesArray)
    }


    //item.solDirFiles.length > 0 ? solDirFiles.push(item.solDirFiles[0]) : void 0

    //****************** HEADER *********************

    let fieldsConfig = []
    fields.map(i => fieldsConfig.push({
        name: configLabels[i].name,
        label: configLabels[i].label,
        div: configLabels[i].div
    }))

    return (
        <div>
            <div className="row "
                style={{
                    fontSize: 16,
                    fontFamily: 'arial',
                    fontWeight: 'bold',
                    backgroundColor: color,
                    filter: 'brightness(190%)',
                    padding: '5px 0px',
                }}>

                {
                    fieldsConfig.map((field, i) =>
                        field.name !== '_id' ?
                            <div className={field.div} key={i}> {field.label} </div> : void 0
                    )
                }
                {
                    renderEmp ?
                        <div className={configEmpLabels[1].div}>
                            Interessado
                    </div> : void 0
                }
                {
                    renderRt ?
                        <div className={configRtLabels[1].div}>
                            RT
                    </div> : void 0
                }
                <div className="col s1 right">
                    Selecionar
                     </div>
            </div>

            {/* ***************** BODY / ROWS ***************** */}
            {

                search.map((item, k) => {

                    let empName
                    let rtName
                    let itemArray = []
                    let empreend = collection.filter(emp => emp._id.match(item.empId))

                    for (let keys in empreend) {
                        empName = {
                            key: keys,
                            values: empreend[keys]
                        }
                    }

                    rtName = rtCollection.filter(rt => rt._id.match(item.rtId))
                    for (let keys in rtName) {
                        rtName = {
                            key: keys,
                            values: rtName[keys]
                        }
                    }

                    for (let keys in item) {
                        itemArray.push({
                            key: keys,
                            values: item[keys]
                        })
                    }

                    let i2 = []
                    let solDirFiles = []
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

                                            <div key={i} className={fieldConfig(field.key, 'div')}>
                                                {field.values}
                                            </div>
                                        : void 0
                                )
                            }
                            {
                                (empName && renderEmp) ?
                                    <div id={empName.values._id} className={fieldConfig(Object.keys(empName.values)[1], 'div')} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={empDetails}>
                                        {empName.values.nome}
                                    </div> :
                                    (!empName && renderEmp) ?
                                        < div className={configEmpLabels[1].div}  > </div> : void 0
                            }
                            {

                                sdFilesArray.map(obj =>
                                    <div id={obj.id} name={obj.filename} className='col s1' onClick={download}>{obj.fieldName}</div>
                                )
                                /* (rtName && renderRt) ?
                                    <div id={rtName.values._id} className={configRtLabels[1].div} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={rtDetails}>
                                        {rtName.values.nomeRt}
                                    </div> :
                                    (!rtName && renderRt) ?
                                        <div className={configRtLabels[1].div}> </div> : void 0 */
                            }
                            <div className="col s1 center">
                                <input id={item._id}
                                    type="radio"
                                    name="group1"
                                    onClick={onSelect}
                                    value={i2.map(field => field.key === '_id' ? `${field.values}` : void 0)}
                                    defaultChecked={checked === this.id}
                                />
                                <label htmlFor={item._id}> </label>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
};

export default RenderSearch;