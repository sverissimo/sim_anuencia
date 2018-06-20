import React from 'react';
import axios from 'axios';
import CadEmpTemplate from './cad_emp_template';
import OpenProcess from './cad_emp_open';

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
        nomeRt: '',
        emailRt: '',
        phoneRt: '',
        openProcess: false,
        nProcesso: ''

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
            })
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
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
        });
        axios.post('/api/cadastro_rt', {
            nomeRt: this.state.nomeRt,
            emailRt: this.state.emailRt,
            phoneRt: this.state.phoneRt
        })
            .then(this.setState({ ...this.state, openProcess: true }))
            .then(console.log(this.state))
            .catch(err => {
                alert(err)
            })
        //window.location.href = '/';
    }

    render() {
        return (
<div>
            <CadEmpTemplate
                data={this.state}
                handleChange={(change) => this.handleChange(change)}
                handleSubmit={(submit) => this.handleSubmit(submit)}
                handleBlur={(cep) => this.handleBlur(cep)}
            >

            <OpenProcess
                data={this.state}
                handleChange={(change) => this.handleChange(change)}
                handleSubmit={(submit) => this.handleSubmit(submit)}
                handleBlur={(cep) => this.handleBlur(cep)}
                
            />
            </CadEmpTemplate>
     </div>       
        )
    }
}

export default CadastroEmpreend;
