import React, { Component } from 'react';
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import ReactQuill from 'react-quill';
import { loadEmpData, loadRtData, loadProcessData, reduxToastr } from '../cadastro/cadActions'
import MostrarOficio from './mostrarOficio'
import { sendMail } from '../common/sendMail'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const modules = { toolbar: toolbarOptions }

class AnuenciaForm extends Component {

    state = {
        color: '',
        text: '',
        mostrarOficio: false,
        oficio: ''
    }

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.setState({ setColor: color })
    }

    handleChange(value) {
        this.setState({ ...this.state, text: value })
    }

    savePdf() {
        this.setState({ mostrarOficio: true })
    }

    async enviaPendencias(e) {
        e.preventDefault()
        const { process, empreend, rt } = this.props

        const { modalidade, nomeEmpreendimento, munEmpreendimento } = process


        const pendCounter = this.props.process.processHistory.filter(log => log.label.match('Análise'))

        const label = `Análise ${pendCounter.length + 1}`
        const oficio = document.getElementById('oficio').outerHTML

        this.setState({ oficio: oficio })
        try {
            await axios.put('/api/editProcess', {
                id: this.props.process._id,
                status: 'Pendências',
                processHistory: {
                    label: label,
                    createdAt: new Date(),
                    pendencias: oficio
                }
            })

            await reduxToastr('sucess', 'Pendências para a emissão de anuência.')
            await sendMail(empreend.email, rt.emailRt, empreend.nome, modalidade, nomeEmpreendimento, munEmpreendimento, 'Pendências para a emissão de anuência.')
            await this.props.close()
            setTimeout(() => {
                window.location.reload()
            }, 1500);

        } catch (err) {
            console.log(err)
            reduxToastr('Erro!', 'Sessão expirada!')
            setTimeout(() => {
                window.location.reload()
            }, 1900);
        }
    }

    render() {
        const { empreend, rt, process } = this.props
        const enableAnuencia = () => this.state.mostrarOficio ? false : 'disabled'

        return (
            <div style={{ height: '100%' }}>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                    modules={modules}
                    theme='snow'
                    style={{
                        background: '#fff',
                        height: '50vh',
                        marginBottom: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '1%',
                        overflow: 'hidden',
                    }}
                />
                <MostrarOficio
                    mostrarOficio={this.state.mostrarOficio}
                    content={this.state.text}
                    oficio={this.state.oficio}
                    process={process}
                    empreend={empreend}
                    rt={rt}
                />

                <button className='btn right' onClick={this.enviaPendencias.bind(this)} disabled={enableAnuencia()}> Enviar </button>
                <button style={{ marginRight: '10px' }} className='btn right' onClick={this.savePdf.bind(this)} disabled={!enableAnuencia()}> Pré-visualizar </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cadastro: state.cadastro
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AnuenciaForm);