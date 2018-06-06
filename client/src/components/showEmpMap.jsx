import React from 'react';
import './css/styles.css';

const ShowEmpMap = (props) => {

    const object = props.object

    const handleClick = () => {

        const myWindow = window.open("", "MsgWindow", "width=800,height=200");
        myWindow.document.write(JSON.stringify(object))
    };

    //console.log(object)
    return (

        <tr key={props.object._id} onClick={handleClick}>
            <td>{object.nome}</td>
            <td>{object.email}</td>
            <td>{object.phone}</td>
            <td>{object.rua}</td>
            <td>{object.cidade}</td>
            <td>{object.uf}</td>
        </tr>
    )

}

export default ShowEmpMap;