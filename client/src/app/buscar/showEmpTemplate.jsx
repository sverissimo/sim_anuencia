import React from 'react';
import './../css/styles.css';

const ShowEmpTemplate = (props) => {
    return (

        <div style={{ marginLeft: '3em', marginRight: '3em' }} >
            <span style={{ fontSize: 18, fontFamily: 'arial', fontWeight: 'bold' }} >
                Buscar
           </span>



            <hr />
            <div>

                {/* <table className="table" > */}
                {/* <thead className="thead-light">
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

                    <tbody> */}
                <div class="input-field container">

                    <div className="row">
                        <label>Selecione o método de Busca</label>
                        <br />
                    </div>

                    <div className="col s3">
                        <select>
                            <option value="" >Selecione</option>
                            <option value="emp">Empreendedor</option>
                            <option value="rt">Responsável Técnico</option>
                            <option value="process">Processo</option>
                        </select>
                    </div>
                    <div className="col s9">

                        <form className="input-field" >
                            <input className="form-control" value={props.search} onChange={props.change} type="search" placeholder="procurar..." aria-label="Search" />
                        </form>
                    </div>

                    <div className="row col s12">

                        {props.children}
                    </div>
                    {/* </tbody>

                </table> */}
                </div>
            </div>
        </div>
    )
}

export default ShowEmpTemplate;