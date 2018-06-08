import React from 'react';
import './css/styles.css';

const ShowEmpTemplate = (props) => {
    return (

        <div className="container">
        <h3>Empreendedores Cadastrados</h3>
        <hr/>
            <table className="table-sm table-hover" >
                <thead>
                    <tr>
                        <th> Nome</th>
                        <th>CPF / CNPJ</th>
                        <th>Endereço</th>
                        <th>Bairro</th>
                        <th>CEP</th>
                        <th>Cidade</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
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