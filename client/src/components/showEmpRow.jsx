import React from 'react';
import './css/styles.css';

const ShowEmpRow = (props) => {

    const object = props.object
   
    
     /*      const myWindow = window.open("", "MsgWindow", "width=800,height=200");
         myWindow.document.write(JSON.stringify(object))  }; */
     console.log()
         return (
        <tr key={object._id} id={object._id}>
            <th scope="row">{props.i}</th>
            <td>{object.nome}</td>
            <td>{object.cpf}</td>
            <td>{object.rua}, {object.numero} {object.complemento}</td>
            <td>{object.bairro}</td>
            <td>{object.cep}</td>
            <td>{object.cidade}, {object.uf}</td>
            <td>{object.phone}</td>
            <td>{object.email}</td>
            <td style={{ border: 0 }}><button className="btn btn-danger btn-rounded btn-sm my-0" onClick={props.delete}>Apagar</button></td>
        </tr>
    )
}

export default ShowEmpRow;