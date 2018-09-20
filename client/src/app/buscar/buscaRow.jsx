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

        props.data.select === 'emp' ? filteredArray.splice(6, 9) : null
        props.data.select === 'rt' ? filteredArray.splice(4, 3) : null
        props.data.select === 'process' ? filteredArray.splice(5, 5) : null

        return filteredArray.slice(1).map((tst, w) =>
            <td key={w} style={{ wordWrap: 'break-word' }} >{tst}</td>
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