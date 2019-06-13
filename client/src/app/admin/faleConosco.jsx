import React, { Component } from 'react';
import axios from 'axios';
import { Input, Icon, Button } from 'react-materialize'
import { reduxToastr } from '../cadastro/cadActions'
import TitleSubtitle from '../common/titleSubtitle'

class FaleConosco extends Component {
    state = {}

    componentDidMount() {
        const user = { ...localStorage },
            { name, surName, email } = user,
            person = name + ' ' + surName

        this.setState({ email, person })

        setTimeout(() => {
            let color = document.getElementById('setcolor').style.backgroundColor
            this.setState({ color })
        }, 250)
    }

    handleChange = e => {
        const { value, name } = e.target
        this.setState({ [name]: value })
    }

    fields = [
        {
            label: 'Nome',
            defaultValue: localStorage.name + ' ' + localStorage.surName,
            disabled: true
        },
        {
            label: 'E-mail',
            defaultValue: localStorage.email,
            disabled: true,
        },
        {
            name: 'subject',
            label: 'Assunto',
            autoFocus: true,
            value: this.state.subject,
            onChange: this.handleChange,
        }]

        handleSubmit = async  e => {
            let { color, person, email, mensagem, ...msg } = this.state
            msg.html = `
            De: ${person} <br />
            E-mail: ${email} <br />
            Mensagem:        <br />
            ${mensagem}
            `
            msg.to = 'anuencia.digital@agenciarmbh.mg.gov.br'
    
            try {
    
                await axios.post('/api/mail', msg)
                    .then(res => {
                        console.log(res.data)
                        this.setState({ mensagem: '', subject: '' })
                    })
                reduxToastr('sucess', 'Mensagem enviada', 'Obrigado por nos contatar!')
                
            } catch (e) {
                console.log(e)
                reduxToastr('err', 'Mensagem não entregue', 'Erro')
            }
        }
    render() {

        return (
            <div style={{backgroundColor: 'rgb(250,250,250)', height:'80vh', paddingTop:'1%'}}>

                <div className='container z-depth-2' style={{ padding: '0.5% 3% 5% 3%', backgroundColor: '#fff'}}>
                    <TitleSubtitle
                        title='Fale Conosco'
                        subtitle='Dúvidas, críticas ou sugestões? Escreva-nos uma mensagem ou envie um e-mail para'
                        hyperLink= 'anuencia.digital@agenciarmbh.mg.gov.br'
                        color={this.state.color}
                    />
                    <fieldset>
                        {this.fields.map((el, i) => <Input key={i}{...el} />)}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="icon_prefix2"><i className="material-icons tiny">email</i><sup> Digite sua Mensagem</sup> </label>
                        <textarea id="icon_prefix2"
                            name='mensagem'
                            style={{ height: '6rem' }}
                            className="materialize-textarea"
                            value={this.state.mensagem}
                            onChange={this.handleChange}
                        ></textarea>
                    </fieldset>
                    <div className="right" style={{padding:'1.5% 0 1% 0'}}>
                        <Button type="submit" waves="purple" className="cyan" onClick={this.handleSubmit}>
                            Enviar <Icon right>send</Icon>
                        </Button>
                    </div>
                </div>
            </div >
        );
    }
}

export default FaleConosco;