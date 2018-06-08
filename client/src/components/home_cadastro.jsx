import React from 'react';
import { Link } from 'react-router-dom';

const HomeCadastro = () => {

  return (

<div>
<div className="jumbotron" id="jumbotron_cad">
        <div className="container">
          <h1 className="display-3"> <strong> Cadastros</strong> </h1>
          <h5>
            Cadastre aqui os dados do empreendedor, do Responsável Técnico e faça a triagem do processo.
          </h5>
          <p className="btn btn-primary btn-lg" href="" role="button">Saiba mais &raquo;</p>
        </div>
      </div>


        <hr />



<div className="container marketing">


  <div className="row">
    <div className="col-lg-4">
      <img className="rounded-circle" src="https://www.stjohnscentre.org/wp-content/uploads/2017/11/money.jpg" alt="" width="140" height="140" />
        <h2>Cadastro do Empreendedor</h2>
        <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
        <p className="btn btn-secondary" href="" role="button">
        <Link to="/cadastro_emp" style={{ color: 'white' }}>Cadastrar Empreendedor</Link> 
        &raquo;</p>
    </div>
    <div className="col-lg-4">
        <img className="rounded-circle" src="https://sto-blog.s3.amazonaws.com/images/2018/01/12/melhores-faculdades-de-arquitetura-e-urbanismo.jpg" alt="" width="140" height="140" />
          <h2>Cadastro do RT</h2>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
          <p className="btn btn-secondary" href="" role="button">
          <Link to="/cadastro_rt" style={{ color: 'white' }}>Cadastrar RT &raquo;</Link></p>
    </div>
    <div className="col-lg-4">
          <img className="rounded-circle" src="https://images.unsplash.com/photo-1476081718509-d5d0b661a376?ixlib=rb-0.3.5&s=557c3fbd30f20515af6a5b0a61e3ba5f&auto=format&fit=crop&w=633&q=80" alt="Cadastro processo" width="140" height="140" />
            <h2>Cadastro do Processo</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p className="btn btn-secondary" href="" role="button">Cadastrar processo &raquo;</p>
    </div>
  </div>
  </div>
</div>

   

            )
        
        };
        
export default HomeCadastro;