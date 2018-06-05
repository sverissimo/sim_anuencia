import React from 'react';
import './css/styles.css';

const EmpreendTable = (props) => {

        const handleClick = () => {
           
            const myWindow = window.open("", "MsgWindow", "width=700,height=200");
            myWindow.document.write(JSON.stringify(props)); 
            console.log(props)
        }
    



    return (
        <div>
            <table className="table table-hover" >
                <thead>

                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Rua</th>
                        <th>Cidade</th>
                        <th>UF</th>

                    </tr>
                </thead>

                <tbody>

                    <tr key={props._id} value= {props} onClick={handleClick}>
                        <td>{props.nome}</td>
                        <td>{props.email}</td>
                        <td>{props.phone}</td>
                        <td>{props.rua}</td>
                        <td>{props.cidade}</td>
                        <td>{props.uf}</td>

                    </tr>
                </tbody>


            </table>
        </div>
    )

}

export default EmpreendTable;