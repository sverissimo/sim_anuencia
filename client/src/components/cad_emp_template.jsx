import React from 'react';

const CadEmpTemplate = (props) => {

  /*   const changeProps = (event, id) => {
const newState = props.data;
newState[id].value = event.target.value;
    } */

    return (
       
<div className="container">
<div className="tab-pane fade show active" id="empreend" role="tabpanel" aria-labelledby="empreend-tab">

                <form onSubmit={props.handleSubmit}>
                    <fieldset className="form-group">
                        <legend className="form-group">
                            <strong> Empreendedor Responsável </strong>
                        </legend>

                        <div className="row">

                            <div className="form-group col-sm-6">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" className="form-control" name="nome" onChange={props.handleChange} value={props.data.nome} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="cpf">CPF / CNPJ:</label>
                                <input type="number" className="form-control" name="cpf" onChange={props.handleChange} value={props.data.cpf} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="birth">Birth</label>
                                <input type="date" className="form-control" name="birth" onChange={props.handleChange} value={props.data.birth} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="phone">Telefone:</label>
                                <input type="number" className="form-control" name="phone" onChange={props.handleChange} value={props.data.phone} />
                            </div>

                        </div>


                        <div className="row">
                            <div className="form-group col-sm-2">
                                <label htmlFor="cep">CEP:</label>
                                <input type="text" className="form-control" name="cep" id="cep" maxLength="9" onChange={props.handleChange} onBlur={props.handleBlur} value={props.data.cep} />
                            </div>

                            <div className="form-group col-sm-2">
                                <label htmlFor="numero">Número:</label>
                                <input type="text" className="form-control" name="numero" onChange={props.handleChange} value={props.data.numero} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="complemento">Complemento:</label>
                                <input type="text" className="form-control" name="complemento" onChange={props.handleChange} value={props.data.complemento} />
                            </div>

                            <div className="form-group col">
                                <label htmlFor="email">E-mail:</label>
                                <input type="text" className="form-control" name="email" onChange={props.handleChange} value={props.data.email} />
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="rua">Rua:</label>
                                <input type="text" className="form-control" name="rua" onChange={props.handleChange} value={props.data.rua} />
                            </div>
                            <div className="form-group col-sm-5">
                                <label htmlFor="bairro">Bairro:</label>
                                <input type="text" className="form-control" name="bairro" onChange={props.handleChange} value={props.data.bairro} />
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="cidade">Cidade:</label>
                                <input type="text" className="form-control" name="cidade" onChange={props.handleChange} value={props.data.cidade} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="uf">Estado:</label>
                                <input type="text" className="form-control" name="uf" onChange={props.handleChange} value={props.data.uf} />
                            </div>


                            <input type="text" className="form-control" name="ibge" id="ibge" style={{ display: 'none' }} />



                        </div>



                    </fieldset>

                    <div>
                        <input type="submit" value="salvar" />
                    </div>
                </form>

            </div>
</div>
            




    );
};

export default CadEmpTemplate;