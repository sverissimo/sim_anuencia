import React from 'react'
import { Link } from 'react-router-dom'

const HomeEmpreend = (props) => {
    let { color, processes } = props
    console.log(processes)
    return (
        <div style={{ marginTop: '3%' }}>
            
            <h5>Você tem  {processes.length} processos cadastrados.</h5>
            <br />

            <div className="col s12 m4 push-m4 center-align">
                <img src="/images/gerenciarProc3.png"
                    style={{ margin: '10px' }} alt=""  />

                <h5><b>Acompanhar Processos</b></h5>                

                    <p  style={{textAlign: 'justify'}}  >Acompanhe o andamento dos processos e veja os
                documentos, projetos, o histórico e as comunicações referentes a ele.</p>
                    <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
                        <Link to="/showEmpreend" style={{ color: 'white' }}>Consulta a Processos &raquo;</Link></p>
                </div>
            </div>
        


    );
};

export default HomeEmpreend;