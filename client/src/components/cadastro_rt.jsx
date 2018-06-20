import React from 'react';
/* import cadastroEmp from './cadastro_emp';
import CadastroEmpreend from './cadastro_emp'; */

class CadastroRT extends React.Component {
    
    
    state = {
            nomeRt: '',
            cpfRt: '',
            emailRt: '',
            phoneRt: '',
            formacaoRt: '',
            conselhoRT: '',
            crea: '',
          
        }

        
    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        }, ()=>
        console.log(this.state));
    };

        handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        }, ()=>
        console.log(this.state));
        //alert('copy that, bro');
        //window.location.href = '/';
   
    } 



render() {
    return (
       
            <div className="tab-pane fade show active" id="rt" role="tabpanel" aria-labelledby="rt-tab">

                <form onSubmit={this.handleSubmit}>
                    
                  
                </form>
                
            </div>
       

    )
}
}

export default CadastroRT;
