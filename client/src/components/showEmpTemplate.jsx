import React from 'react';
import './css/styles.css';

const ShowEmpTemplate = (props) => {
    return (

        <div className="container">
        <h3>Empreendedores Cadastrados</h3>
        <hr/>
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
                    {props.children}
                </tbody>

            </table>
        </div>
    )
}

export default ShowEmpTemplate;