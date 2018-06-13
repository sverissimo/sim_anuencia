import React from 'react';
import './css/styles.css';

const ShowEmpTemplate = (props) => {
    return (

        <div className="container">
        <h3>Empreendedores Cadastrados</h3>
        <hr/>
            <table className="table" >
                <thead className="thead-dark">
                    <tr>
                    <th scope="col"> Nº</th>
                        <th scope="col"> Nome</th>
                        <th scope="col">CPF / CNPJ</th>
                        <th scope="col">Endereço</th>
                        <th scope="col">Bairro</th>
                        <th scope="col">CEP</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">E-mail</th>
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