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

        <tr key={object._id} onClick={handleClick}>
            <td>{object.nome}</td>
            <td>{object.cpf}</td>
            <td>{object.rua}, {object.numero} {object.complemento}</td>
            <td>{object.bairro}</td>
            <td>{object.cep}</td>
            <td>{object.cidade}, {object.uf}</td>
            <td>{object.email}</td>
            <td>{object.phone}</td>
            
        </tr>
    )

}

export default ShowEmpMap;