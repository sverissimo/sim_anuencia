import React from 'react';
import './css/styles.css';

const ShowEmpTemplate = (props) => {
    return (

        <div style={{ marginLeft: '3em', marginRight: '3em' }} >
           <span style={{ fontSize: 18, fontFamily: 'arial', fontWeight: 'bold' }} >
                        Empreendedores Cadastrados
           </span>

          <form className="form-inline my-2 my-lg-0" id="search_form">
                        <input className="form-control mr-sm-2" value={props.search} onChange={props.change} type="search" placeholder="procurar..." aria-label="Search" />
                        {/* 
                         {<button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Busca</button>}
 */}
                    </form>  
            
            <hr />
            <table className="table" >
                <thead className="thead-light">
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