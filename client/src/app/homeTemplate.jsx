import React from 'react';
import { Link } from 'react-router-dom';

const HomeTemplate = (props) => {
let { color } = props
  return (

    <div>
      <div className="card-panel" id="jumbotron_home">
        <div className="container">
          <h1 className="display-3"> <strong> 
            <span style={{ color: 'white' }} >Bem-vindo ao SIM</span> </strong> </h1>
          <h4 style={{ color: 'white' }}>
            Módulo Anuência Prévia (versão beta)
          </h4>
          <p className="btn btn-primary btn-lg" href="" role="button"  style={{ backgroundColor: color }}>Saiba mais &raquo;</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div align="center" className="col s12 m3">
            <img src="data:image/png;base64,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"
              style={{ margin: '10px' }} alt="" width="105" height="120" />

            <h5><b>Cadastrar Processo</b></h5>
            <p style={{ textAlign: 'justify' }}>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/cadastro" style={{ color: 'white' }}>Cadastrar Processo</Link>
              &raquo;</p>
          </div>
          <div className="col s12 m3" align="center">
            <img className="center-align" src="http://3.bp.blogspot.com/_pqpA8oAIBzE/TJIvOeLp4hI/AAAAAAAAAKE/Db6dV2TKaL0/s1600/Massilon,Ana+canada,Auro,aris,Angelina-Layout3-ISO+A1.jpg"
              style={{ margin: '10px' }} width="105" height="120" alt="" />


            <h5><b>Solicitar Diretrizes</b></h5>
            <p style={{ textAlign: 'justify' }}>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/solicitaDiretriz" style={{ color: 'white' }}>Solicitar Diretrizes</Link>
              &raquo;</p>
          </div>
          <div className="col s12 m3" align="center">
            <img src="https://cdn0.iconfinder.com/data/icons/science-9/512/list-512.png"
              style={{ margin: '0px' }} alt="" width="140" height="140" />

            <h5><b>Solicitar Anuência</b></h5>
            <p style={{ textAlign: 'justify' }} >Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/solicitaAnuencia" style={{ color: 'white' }}>Solicitar Anuência &raquo;</Link></p>
          </div>
          <div className="col s12 m3" align="center">

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3uBJUOmCdcrPDvHxrcMzLCYCYDzQqHCOB_VRys6jKUQXHN4P"
              style={{ margin: '10px' }} alt="" width="120" height="120" />


            <h5><b>Gerenciar Dados</b></h5>
            <p style={{ textAlign: 'justify' }}>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/showEmpreend" style={{ color: 'white' }}>Buscar Processo &raquo;</Link></p>
          </div>
        </div>
      </div>
    </div>



  )

};

export default HomeTemplate;