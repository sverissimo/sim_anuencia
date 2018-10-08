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

        props.data.select === 'emp' ? filteredArray.splice(6, 9) : void 0
        props.data.select === 'rt' ? filteredArray.splice(4, 3) : void 0
        props.data.select === 'process' ? filteredArray.splice(5, 5) : void 0
        
        return filteredArray.slice(2).map((item, w) =>
            <td key={w} style={{ wordWrap: 'break-word' }} >{item}</td>
        )
    }

    return searchMatch.map((item, i) => {
        n = n + 1
        return (
            <tr key={i}>
                <th scope="row">{n}</th>
                {renderFields(item)}
                <td style={{ width: '4%' }}>
                    <EditButton
                        handleEdit={props.edit} id={item._id} />
                </td>
                <td style={{ width: '4%' }}>
                    <DeleteButton delete={props.delete} id={item._id} />
                </td>
            </tr>
        )
    })
}
export default ShowEmpRow;