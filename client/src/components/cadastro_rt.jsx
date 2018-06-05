import React from 'react';


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
                    
                    <fieldset className="form-group">
                        <legend className="form-group">
                            <strong> Responsável Técnico </strong>
                        </legend>



                    <div className="row">

                        <div className="form-group col-sm-4">
                            <label htmlFor="nomeRt">Nome</label>
                            <input type="text" className="form-control" name="nomeRt" onChange={this.handleChange} value={this.state.nomeRt} />
                        </div>
                        <div className="form-group col-sm-2">
                            <label htmlFor="cpf">CPF / CNPJ:</label>
                            <input type="number" className="form-control" name="cpfRt" onChange={this.handleChange} value={this.state.cpfRt} />
                        </div>
                        <div className="form-group col-sm-2">
                            <label htmlFor="phoneRt">Telefone:</label>
                            <input type="number" className="form-control" name="phoneRt" onChange={this.handleChange} value={this.state.phoneRt} />
                        </div>
                        <div className="form-group col-sm-4 ">
                            <label htmlFor="emailRt">E-mail:</label>
                            <input type="text" className="form-control" name="emailRt" onChange={this.handleChange} value={this.state.emailRt} />
                        </div>

                    </div>
                    <div className="row">
                        <div className="form-group col-sm-4">
                            <label htmlFor="formacaoRt">Formação:</label>
                            <input type="text" className="form-control" name="formacaoRt" onChange={this.handleChange} value={this.state.formacaoRt} />
                        </div>
                        
                        <div className="form-group col-sm-2">
                            <label htmlFor="conselhoRt">Conselho:</label>
                            <input type="text" className="form-control" name="conselhoRt" onChange={this.handleChange} value={this.state.conselhoRt} />
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="crea">CAU / CREA:</label>
                            <input type="number" className="form-control" name="crea" onChange={this.handleChange} value={this.state.crea} />
                        </div>

                    </div>



                       
                    </fieldset>
                    <div>
                            <input type="submit" value="Salvar" /> 
                        </div>
                </form>
                
            </div>
       

    )
}
}

export default CadastroRT;
