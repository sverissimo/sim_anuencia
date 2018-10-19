import React from 'react';
import { DeleteButton, EditButton } from './../common/buttons'
import './../css/styles.css';

const ShowEmpRow = (props) => {

    let n = 0
    let searchMatch = []

    if (props.emps && props.emps[0] && props.data.edit === false) {
        searchMatch = props.emps
    } else if (props.rts && props.rts[0] && props.data.edit === false) {
        searchMatch = props.rts
    } else if (props.process && props.process[0] && props.data.edit === false) {
        searchMatch = props.process
    } else {
        return null
    }

    const renderFields = (item, w) => {

        let filteredArray = Object.values(item)
        let s = 1

        props.data.select === 'emp' ? filteredArray.splice(6, 9) : void 0
        props.data.select === 'rt' ? filteredArray.splice(4, 3) : void 0
        props.data.select === 'process' ? (s = 2, filteredArray.splice(6, 5), filteredArray.splice(3, 1)) : void 0
        
        return filteredArray.slice(s).map((item, w) =>
           
                <div className="col s2" key={w} style={{ wordWrap: 'break-word' }} >{item}</div>
           
        )
    }

    return searchMatch.map((item, i) => {
        n = n + 1
        return (
            <div key={i} className="col s12">
                <div className="col s1">{n}</div>
                {renderFields(item)}
                <div className="col s1 right">
                    <EditButton
                        handleEdit={props.edit} id={item._id} />
                </div>
                <div className="col s1 right">
                    <DeleteButton delete={props.delete} id={item._id} />
                </div>
            </div>
        )
    })
}
export default ShowEmpRow;