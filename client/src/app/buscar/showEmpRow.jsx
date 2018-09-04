import React from 'react';
import './../css/styles.css';

const ShowEmpRow = (props) => {

    const object = props.object


    /*      const myWindow = window.open("", "MsgWindow", "width=800,height=200");
        myWindow.document.write(JSON.stringify(object))  }; */

    return (
        <div className="col s12">

            <tr key={object._id} id={object._id}>
                <th scope="row">{props.i}</th>
                <td>{object.nomeRt}</td>
                <td>{object.phoneRt}</td>
                <td>{object.emailRt}</td>
                <td style={{ border: 0 }}>
                <button className="btn btn-rounded right red" onClick={props.delete}>Apagar</button>
                </td>
            </tr>
        </div>
    )
}

export default ShowEmpRow;