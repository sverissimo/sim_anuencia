import React from 'react';
import { configLabels, configEmpLabels, configRtLabels } from '../config/configLabels';
import { DeleteButton, EditButton, InfoButton } from './../common/buttons'
import './../css/styles.css';

const ShowEmpRow = (props) => {

    let { redux, emps, rts, process, empFields, rtFields, showRt, edit, deleteOne, data, fields,
        divConfig, color, empDetails, rtDetails, showInfo, clearLog } = props

    const userRole = localStorage.getItem('role')

    let searchMatch = []
    let selectedFields
    let headerLabels = []

    if ((emps && emps[0]) && data.edit === false) {
        searchMatch = emps
        selectedFields = empFields
        headerLabels = configEmpLabels
        divConfig = ['col s3', 'col s2', 'col s2', 'col s1', 'col s1', 'col s2']
    } else if ((rts && rts[0]) && data.edit === false) {
        searchMatch = rts
        selectedFields = rtFields
        headerLabels = configRtLabels
        divConfig = ['col s4', 'col s3', 'col s4']
    } else if ((process && process[0]) && data.edit === false) {
        searchMatch = process
        selectedFields = fields
        headerLabels = configLabels
    }

    //****************** HEADER *********************

    let fieldsConfig = []
    if (headerLabels.length > 0) {
        selectedFields.forEach(el => {
            fieldsConfig.push(headerLabels.filter(item => item.name === el)[0])
        })
    }

    if (searchMatch && searchMatch[0]) {

        return (
            <div className="z-depth-3" style={{ padding: '0px 11px', borderRadius: '10px' }}>
                <div className="row tableHeader"
                    style={{
                        backgroundColor: color,
                        filter: 'brightness(190%)',
                        padding: '5px 0px',
                    }}>

                    {
                        fieldsConfig.map((field, i) =>
                            field.name !== '_id' ?
                                <div className={divConfig[i]} key={i}> {field.label} </div> : void 0
                        )
                    }
                    {
                        data.select === 'process' ?
                            <div>
                                <div className='col s2'>
                                    Interessado </div>

                                {
                                    showRt ?
                                        <div className='col s1'>
                                            RT </div> : void 0
                                }
                            </div>
                            : void 0
                    }
                    {(userRole === 'admin' || data.select === 'process') && <div className='col s1'>
                        Informações</div>}
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
                        selectedFields && selectedFields.length > 0 ? selectedFields.map(i => i2.push(
                            itemArray.filter(el => el.key === i)[0]
                        )) : void 0
                        
                        return (
                            <div className="row" key={k} style={{ borderBottom: '1px dotted #bbb', paddingBottom: '1%' }}>
                                {
                                    i2.map((field, i) =>
                                        field.key !== '_id' ?

                                            !isNaN(Date.parse(field.values)) && String(field.values).length > 15 ?
                                                <div key={i} className="col s1">
                                                    {new Date(field.values).getDate()}/{new Date(field.values).getMonth() + 1}/{new Date(field.values).getFullYear()}
                                                </div> :
                                                <div key={i} className={divConfig[i]} style={{ wordBreak: 'break-word' }}>
                                                    {field.values}
                                                </div>
                                            : void 0
                                    )
                                }
                                {
                                    (data.select === 'process' && (empName && empName.values)) ?

                                        <div id={empName.values._id} className='col s2' style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={empDetails}>
                                            {empName.values.nome}
                                        </div> : <div className='col s2'>  </div>
                                }

                                {
                                    (showRt && (data.select === 'process' && (rtName && rtName.values))) ?
                                        <div id={rtName.values._id} className='col s1' style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={rtDetails}>
                                            {rtName.values.nomeRt}
                                        </div>
                                        : <div className='col s1'> </div>
                                }
                                {
                                    data.select === 'process' ?
                                        <div className="col s2"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                maxWidth: '95px',
                                                margin: '0 auto',
                                                padding: '0px 5px',
                                                height: '100%',
                                                verticalAlign: 'middle',
                                                paddingLeft: `${userRole !== 'admin' && '3%'}`
                                            }}>
                                            <InfoButton showInfo={showInfo} clearLog={clearLog} id={item._id} />
                                            <EditButton edit={edit} id={item._id} userRole={userRole} />
                                            <DeleteButton delete={deleteOne} id={item._id} userRole={userRole} />
                                        </div>
                                        :
                                        <div className="col s2 right"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                maxWidth: '95px',
                                                margin: '0 auto',
                                                padding: '0px 5px',
                                                height: '100%',
                                                verticalAlign: 'middle'
                                            }}>
                                            <EditButton edit={edit} id={item._id} userRole={userRole} />
                                            <DeleteButton delete={deleteOne} id={item._id} userRole={userRole} />
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        let item = 'processo'
        if (data.select === 'emp') item = 'empreendedor'
        if (data.select === 'rt') item = 'responsável técnico'

        return (
            <div style={{ textAlign: 'center', padding: '4% 0' }}>
                <strong>
                    Nenhum {item} encontrado. Verifique se que seu processo foi cadastrado pela prefeitura.
        </strong>
            </div>
        )
    }
}

export default ShowEmpRow;