import React from 'react';
import axios from 'axios';

class CadastroEmpreend extends React.Component {

    state = {
        nome: '',
        cpf: '',
        birth: '',
        phone: '',
        cep: '',
        numero: '',
        complemento: '',
        email: '',
        rua: '',
        bairro: '',
        cidade: '',
        uf: '',
    }


    handleBlur = cep => {

        axios.get(`http://apps.widenet.com.br/busca-cep/api/cep.json?code=${this.state.cep}`)
            .then((res) => {
                this.setState({
                    rua: res.data.address,
                    bairro: res.data.district,
                    cidade: res.data.city,
                    uf: res.data.state
                })
                /* .catch((err) => {
                    console.log(`err`)
                }) */
            })
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
        axios.post('/api/cadastro_emp', {
            nome: this.state.nome,
            cpf: this.state.cpf,
            birth: this.state.birth,
            phone: this.state.phone,
            cep: this.state.cep,
            numero: this.state.numero,
            complemento: this.state.complemento,
            email: this.state.email,
            rua: this.state.rua,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
        })
            .then(res => {
                console.log(res, 'all set!');
            })
            .then(alert('alright, bro!')
            )
            .then(
                this.setState({
                    nome: '',
                    cpf: '',
                    birth: '',
                    phone: '',
                    cep: '',
                    numero: '',
                    complemento: '',
                    email: '',
                    rua: '',
                    bairro: '',
                    cidade: '',
                    uf: '',
                })
            )
            .catch(err => {
                alert(err)
            })
        //alert('copy that, bro');
        //window.location.href = '/';

    }



    render() {
        return (

            <div className="tab-pane fade show active" id="empreend" role="tabpanel" aria-labelledby="empreend-tab">

                <form onSubmit={this.handleSubmit}>
                    <fieldset className="form-group">
                        <legend className="form-group">
                            <strong> Empreendedor Responsável </strong>
                        </legend>

                        <div className="row">

                            <div className="form-group col-sm-6">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" className="form-control" name="nome" onChange={this.handleChange} value={this.state.nome} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="cpf">CPF / CNPJ:</label>
                                <input type="number" className="form-control" name="cpf" onChange={this.handleChange} value={this.state.cpf} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="birth">Birth</label>
                                <input type="date" className="form-control" name="birth" onChange={this.handleChange} value={this.state.birth} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="phone">Telefone:</label>
                                <input type="number" className="form-control" name="phone" onChange={this.handleChange} value={this.state.phone} />
                            </div>

                        </div>


                        <div className="row">
                            <div className="form-group col-sm-2">
                                <label htmlFor="cep">CEP:</label>
                                <input type="text" className="form-control" name="cep" id="cep" maxLength="9" onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.cep} />
                            </div>

                            <div className="form-group col-sm-2">
                                <label htmlFor="numero">Número:</label>
                                <input type="text" className="form-control" name="numero" onChange={this.handleChange} value={this.state.numero} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="complemento">Complemento:</label>
                                <input type="text" className="form-control" name="complemento" onChange={this.handleChange} value={this.state.complemento} />
                            </div>

                            <div className="form-group col">
                                <label htmlFor="email">E-mail:</label>
                                <input type="text" className="form-control" name="email" onChange={this.handleChange} value={this.state.email} />
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="rua">Rua:</label>
                                <input type="text" className="form-control" name="rua" onChange={this.handleChange} value={this.state.rua} />
                            </div>
                            <div className="form-group col-sm-5">
                                <label htmlFor="bairro">Bairro:</label>
                                <input type="text" className="form-control" name="bairro" onChange={this.handleChange} value={this.state.bairro} />
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="cidade">Cidade:</label>
                                <input type="text" className="form-control" name="cidade" onChange={this.handleChange} value={this.state.cidade} />
                            </div>
                            <div className="form-group col-sm-2">
                                <label htmlFor="uf">Estado:</label>
                                <input type="text" className="form-control" name="uf" onChange={this.handleChange} value={this.state.uf} />
                            </div>


                            <input type="text" className="form-control" name="ibge" id="ibge" style={{ display: 'none' }} />





                        </div>



                    </fieldset>

                    <div>
                        <input type="submit" value="salvar" />
                    </div>
                </form>

            </div>


        )
    }
}

export default CadastroEmpreend;
