import React from 'react';

const CadEmpTemplate = (props) => {

    return (

        <div style={{ marginLeft: 40, marginRight: 40 }} >
            <div className="tab-pane fade show active" id="empreend" role="tabpanel" aria-labelledby="empreend-tab">
                <form onSubmit={props.handleSubmit}>
                    <fieldset className="input-field">
                        <legend className="input-field">
                            <strong> Empreendedor Responsável </strong>
                        </legend>

                        <div className="row">
                            <div className="input-field col s3">
                                <input type="text" className="validate" name="nome" onChange={props.handleChange} value={props.data.nome} />
                                <label className="active" htmlFor="nome">Nome</label>
                            </div>
                            <div className="input-field col s2">
                                <input type="number" className="validate" name="cpf" onChange={props.handleChange} value={props.data.cpf} />
                                <label className="active" htmlFor="cpf">CPF / CNPJ:</label>
                            </div>

                            <div className="input-field col s2">
                                <input type="number" className="validate" name="phone" onChange={props.handleChange} value={props.data.phone} />
                                <label className="active" htmlFor="phone">Telefone:</label>
                            </div>
                            <div className="input-field col">
                                <input type="text" className="validate" name="email" onChange={props.handleChange} value={props.data.email} />
                                <label className="active" htmlFor="email">E-mail:</label>
                            </div>
                            <div className="row">
                                <div className="input-field col s2">
                                    <input type="text" className="validate" name="cep" id="cep" maxLength="9" onChange={props.handleChange} onBlur={props.handleBlur} value={props.data.cep} />
                                    <label className="active" htmlFor="cep">CEP:</label>
                                </div>
                            </div>


                            <div className="input-field col s1">
                                <input type="text" className="validate" placeholder=" " name="numero" onChange={props.handleChange} value={props.data.numero} />
                                <label className="active" htmlFor="numero">Número:</label>
                            </div>
                            <div className="input-field col s2">
                                <input type="text" className="validate" placeholder=" " name="complemento" onChange={props.handleChange} value={props.data.complemento} />
                                <label className="active" htmlFor="complemento">Complemento:</label>
                            </div>


                            <div className="input-field col s3">
                                <input type="text" className="validate" placeholder=" " name="rua" onChange={props.handleChange} value={props.data.rua} />
                                <label className="active" htmlFor="rua">Rua:</label>
                            </div>
                            <div className="input-field col s2">
                                <input type="text" className="validate" placeholder=" " name="bairro" onChange={props.handleChange} value={props.data.bairro} />
                                <label className="active" htmlFor="bairro">Bairro:</label>
                            </div>
                            <div className="input-field col s2">
                                <input type="text" className="validate" placeholder=" " name="cidade" onChange={props.handleChange} value={props.data.cidade} />
                                <label className="active" htmlFor="cidade">Cidade:</label>
                            </div>
                            <div className="input-field col s1">
                                <input type="text" className="validate" placeholder=" " name="uf" onChange={props.handleChange} value={props.data.uf} />
                                <label className="active" htmlFor="uf">Estado:</label>
                            </div>

                            <input type="text" className="validate" name="ibge" id="ibge" style={{ display: 'none' }} />
                        </div>

                    </fieldset>
                    <fieldset className="input-field">
                        <legend className="input-field">
                            <strong> Responsável Técnico </strong>
                        </legend>

                        <div className="row">
                            <div className="input-field col s4">
                                <input type="text" className="validate" name="nomeRt" onChange={props.handleChange} value={props.data.nomeRt} />
                                <label className="active" htmlFor="nomeRt">Nome</label>
                            </div>
                            <div className="input-field col s2">
                                <input type="number" className="validate" name="phoneRt" onChange={props.handleChange} value={props.data.phoneRt} />
                                <label className="active" htmlFor="phoneRt">Telefone:</label>
                            </div>
                            <div className="input-field col s4 ">
                                <input type="text" className="validate" name="emailRt" onChange={props.handleChange} value={props.data.emailRt} />
                                <label className="active" htmlFor="emailRt">E-mail:</label>
                            </div>

                        </div>

                    </fieldset>

                    <div>
                        <input type="submit" value="Salvar" />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CadEmpTemplate;