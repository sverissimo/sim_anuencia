import React from 'react';
import { Link } from 'react-router-dom';

const HomeTemplate = (props) => {
  let { color } = props
 
  return (
    <div>
      <div className="card-panel" style={{backgroundImage: "url(" +'/images/home_bg.jpg'+")"}}>
        <div className="container">
          <h1 className="display-3"> <strong>
            <span style={{ color: 'white' }} >Bem-vindo ao SIM</span> </strong> </h1>
          <h4 style={{ color: 'white' }}>
            Módulo Anuência Prévia (versão beta)
          </h4>
          <p className="btn btn-primary btn-lg" href="" role="button" style={{ backgroundColor: color }}>Saiba mais &raquo;</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div align="center" className="col s12 m3">
            <img src="/images/cadastro.png"
              style={{ margin: '10px' }} alt="" width="105" height="120" />

            <h5><b>Cadastrar Processo</b></h5>
            <p style={{ textAlign: 'justify' }}>Cadastre um novo processo, o interessado e o Responsável técnico. Caso o interessado e RT estejam cadastrados, basta informar o nome e o formulário será preenchido automaticamente.</p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/cadastro" style={{ color: 'white' }}>Cadastrar Processo</Link>
              &raquo;</p>
          </div>
          <div className="col s12 m3" align="center">
            <img className="center-align" src="/images/solDir.jpg"
              style={{ margin: '10px' }} width="105" height="120" alt="" />


            <h5><b>Solicitar Diretrizes</b></h5>
            <p style={{ textAlign: 'justify' }}>
              Para solicitar diretrizes metropolitanas, selecione o processo e
              faça o upload dos documentos necessários em pdf. É necessário que o processo esteja cadastrado previamente.
            </p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/solicitaDiretriz" style={{ color: 'white' }}>Solicitar Diretrizes</Link>
              &raquo;</p>
          </div>
          <div className="col s12 m3" align="center">
            <img src="/images/solAnuencia.png"
              style={{ margin: '0px' }} alt="" width="140" height="140" />

            <h5><b>Solicitar Anuência</b></h5>
            <p style={{ textAlign: 'justify' }} >Para solicitar anuência prévia, selecione o processo e faça o upload dos documentos
 necessários em meio digital. É necessário que o processo possua diretrizes metropolitanas validas.</p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/solicitaAnuencia" style={{ color: 'white' }}>Solicitar Anuência &raquo;</Link></p>
          </div>
          <div className="col s12 m3" align="center">

            <img src="/images/gerenciarProc.png"
              style={{ margin: '10px' }} alt="" width="120" height="120" />


            <h5><b>Gerenciar Dados</b></h5>
            <p style={{ textAlign: 'justify' }}>Busque, edite e gerencie os dados dos processos, 
            interesados e RTs utilizando os filtros disponíveis. Acompanhe os andamentos e veja os arquivos do processo
            através desta opção.</p>
            <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
              <Link to="/showEmpreend" style={{ color: 'white' }}>Buscar Processo &raquo;</Link></p>
          </div>
        </div>
      </div>
    </div>



  )

};

export default HomeTemplate;