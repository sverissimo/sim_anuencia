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
        nProcesso: '',
        loadedData: []
    }

    componentWillMount() {
        axios.get('/api/showEmpreend')
            .then(res => this.setState({ items: res.data }))
            .catch(err => console.log(err))
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
        let autoComplete = event.target.value
        if (autoComplete) {
            let newData = []
            newData = this.state.items.filter(el => el.nome.toLowerCase().match(autoComplete.toLowerCase())) 

            this.setState({
                ...this.state.items, [event.target.name]: event.target.value, newData
            })
            console.log(this.state.newData)
        } else {
            this.setState({
                ...this.state.items, [event.target.name]: event.target.value, newData: []
            })
        }


    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });

        axios.post('/api/cadastro_emp', {
            nome: this.state.nome,
            cpf: this.state.cpf,
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

    handleBlurName = () => {
        this.setState({
            ...this.state,
            phone: this.state.newData[0].phone
        })
        
    }

    render() {
        return (
            <div>
                <CadEmpTemplate
                    data={this.state}
                    handleChange={(change) => this.handleChange(change)}
                    handleBlurName={this.handleBlurName}
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
