import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import jsPDF from 'jspdf'
//import styles from '../css/styles.css'



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

const modules = {
    toolbar: toolbarOptions
}

class anuenciaContainer extends Component {

    state = {
        color: '',
        text: ''
    }

    componentDidMount() {

        let color = document.getElementById('setcolor').style.backgroundColor
        this.setState({ setColor: color })
    }

    handleChange(value) {
        this.setState({ ...this.state, text: value })
        console.log(this.state)
    }

savePdf () {

    const pdf = new jsPDF()
    pdf.text(this.state.text)
    pdf.save('tst.pdf')
}

    render() {
        return (
            <div style={{ background: '#f3f1f2', height: '1000px', paddingTop: '1rem'  }}>
                <h5 className="center" style={{fontWeight: 500, marginBottom: '2rem' }}> Registrar Pendências</h5>

                <div className="container" style={{ border: 0}}>

                    <div style={{ background: '#fff', border: 0}}>
                        <ReactQuill
                            value={this.state.text}
                            onChange={this.handleChange.bind(this)}
                            modules={modules}
                            style={{height: '500px', background: '#fff', border:'2px solid #000'}}
                        />
                    </div>
                    
                </div>
                <button onClick={this.savePdf.bind(this)}>tst</button>
            </div>
        )
    }
}




export default anuenciaContainer;