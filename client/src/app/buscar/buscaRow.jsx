import React from 'react';
import fieldConfig from '../common/fieldConfig'
import { configLabels, configEmpLabels, configRtLabels } from '../common/configLabels';
import { DeleteButton, EditButton } from './../common/buttons'
import './../css/styles.css';

const ShowEmpRow = (props) => {

    let { redux, emps, rts, process, empFields, rtFields, edit, deleteOne, data, fields, color,
        empDetails, rtDetails } = props

    let searchMatch = []
    let selectedFields
    let headerLabels = []

    if (emps && emps[0] && data.edit === false) {
        searchMatch = emps
        selectedFields = empFields
        headerLabels = configEmpLabels
    } else if (rts && rts[0] && data.edit === false) {
        searchMatch = rts
        selectedFields = rtFields
        headerLabels = configRtLabels
    } else if (process && process[0] && data.edit === false) {
        searchMatch = process
        selectedFields = fields
        headerLabels = configLabels
    } else {
        return null
    }

    //****************** HEADER *********************

    let fieldsConfig = []
    headerLabels.length > 0 ?
        selectedFields.map(i => fieldsConfig.push({
            name: headerLabels[i].name,
            label: headerLabels[i].label,
            div: headerLabels[i].div
        }))
        : void 0

    return (
        <div className="z-depth-4" style={{ padding: '0px 11px' }}>
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
                    data.select === 'process' ?
                        <div>
                            <div className={configEmpLabels[1].div}>
                                Interessado </div>
                            <div className={configRtLabels[1].div}>
                                RT </div>
                        </div>
                        : void 0
                }


            </div>

            {/* ***************** BODY / ROWS ***************** */}
            {

                searchMatch.map((item, k) => {

                    let empName
                    let rtName
                    let itemArray = []
                    let empreend = redux.empCollection.filter(emp => emp._id.match(item.empId))

                    for (let keys in empreend) {
                        empName = {
                            key: keys,
                            values: empreend[keys]
                        }
                    }

                    rtName = redux.rtCollection.filter(rt => rt._id.match(item.rtId))
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
                    selectedFields && selectedFields.length > 0 ? selectedFields.map(i => i2.push(itemArray[i])) : void 0
                    
                    return (
                        <div className="row" key={k} style={{borderBottom: 'dotted #bbb' }}>
                            {
                                i2.map((field, i) =>
                                    field.key !== '_id' ?
                                        field.key === 'updatedAt' || field.key === 'createdAt' ?
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
                                (data.select === 'process' && (empName && empName.values)) ?

                                    <div id={empName.values._id} className={fieldConfig(Object.keys(empName.values)[1], 'div')} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={empDetails}>
                                        {empName.values.nome}
                                    </div> : <div className='col s2'>  </div>
                            }

                            {
                                (data.select === 'process' && (rtName && rtName.values)) ?
                                    <div id={rtName.values._id} className={configRtLabels[1].div} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={rtDetails}>
                                        {rtName.values.nomeRt}
                                    </div>
                                    : <div className='col s1'> </div>
                            }

                            <div className="col s2 right" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                maxWidth: '95px',
                                margin: '0 auto',
                                padding: '10px 5px',
                            }}>
                                <EditButton edit={edit} id={item._id} />
                                <DeleteButton delete={deleteOne} id={item._id} />

                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
};


/*  return (
     <div className="col s12">

         <RenderSearch
             search={searchMatch}
             fields={[1, 2, 3, 4, 8, 11]}
             collection={redux.empCollection}
             rtCollection={redux.rtCollection}
             renderEmp={true}
             renderRt={true}
             color={data.setColor}

         />
         
         <div className="col s1 right">
             <RenderButtons
                 onClick={edit}
                 id='item._id'
                 icon='create'
                 title='Editar'
                 className='btn-flat waves-effect btn-floating blue red darken-3'
             />
         </div>
        <div className="col s1 right">
             <DeleteButton delete={deleteOne} id={item._id} />
         </div>
     </div>
 ) */


export default ShowEmpRow;