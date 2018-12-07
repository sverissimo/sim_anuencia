import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import ReactQuill from 'react-quill';
import jsPDF from 'jspdf'
import Title from '../common/titleSubtitle';
import { loadEmpData, loadRtData, loadProcessData } from '../cadastro/cadActions'
import styles from '../css/styles.css'



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

class AnuenciaContainer extends Component {

    state = {
        color: '',
        text: ''
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
        console.log(this.state)
    }

    savePdf() {

        const pdf = new jsPDF()
        pdf.text(this.state.text)
        pdf.save('tst.pdf')
    }

    render() {
        return (

            <div style={{ background: '#f3f1f2', height: "100vh", bottom: 0, paddingTop: '1rem' }}>
                <div className="container">
                    <Title
                        title='Registrar pendências'
                        subtitle='Insira as pendências observadas no processo. É possível colar texto do MSword mantendo a formatação.'
                        color={this.state.setColor}
                    />




                    <ReactQuill
                        value={this.state.text}
                        onChange={this.handleChange.bind(this)}
                        modules={modules}
                        theme='snow'
                        style={{
                            background: '#fff',
                            height: '60vh',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '1%',
                            overflow: 'hidden',
                        }}
                    />


                    <button className=' btn right' onClick={this.savePdf.bind(this)}> whatever </button>
                </div>
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AnuenciaContainer);