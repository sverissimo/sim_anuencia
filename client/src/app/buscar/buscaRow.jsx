import React from 'react';
import { DeleteButton, EditButton } from './../common/buttons'
import './../css/styles.css';



const ShowEmpRow = (props) => {

    let n = 0

    if (props.emps && props.emps[0] && props.redux.editItem === false) {

        return props.emps.map((item, i) => {

            n = n + 1

            return (
               
                    <tr key={i}>
                        <th scope="row">{n}</th>
                        <td>{item.nome}</td>
                        <td>{item.cpf}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
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

    if (props.rts && props.rts[0]) {
        return props.rts.map((item, i) => {
            n = n + 1
            return (
                <tr key={i}>
                    <th scope="row">{n}</th>
                    <td>{item.nomeRt}</td>
                    <td>{item.phoneRt}</td>
                    <td>{item.emailRt}</td>
                    <td style={{ width: '4%' }}>
                        <EditButton />
                    </td>
                    <td style={{ width: '4%' }}>
                        <DeleteButton delete={props.delete} id={item._id} />
                    </td>
                </tr>
            )
        })
    }

    if (props.process && props.process[0]) {
        return props.process.map((item, i) => {
            n = n + 1
            return (
                <tr key={i}>
                    <th scope="row">{n}</th>
                    <td>{item.nomeEmpreendimento}</td>
                    <td>{item.area}</td>
                    <td>{item.modalidade}</td>
                    <td>{item.munEmpreendimento}</td>
                    <td style={{ width: '4%' }}>
                        <EditButton />
                    </td>
                    <td style={{ width: '4%' }}>
                        <DeleteButton delete={props.delete} id={item._id} />
                    </td>
                </tr>
            )
        })
    }
    else {
        return null
    }
}

export default ShowEmpRow;