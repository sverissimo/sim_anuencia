import React from 'react';
import { Link } from 'react-router-dom';

const SubHeader = (props) => {

    return (

        <div className="container" >
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <span className="nav-link" id="empreend-tab" role="tab" aria-controls="empreend" aria-selected="true">
                        <Link to="/cadastro_emp">Cadastro do Empreendedor</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" id="rt-tab" role="tab" aria-controls="rt" aria-selected="true">
                        <Link to="/cadastro_rt">Cadastro do RT</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" id="triagem-tab" role="tab" aria-controls="triagem" aria-selected="false">
                        <Link to="/triagem">Triagem</Link></span>
                </li>
                <li className="nav-item">
                    <span className="nav-link" id="process-tab" role="tab" aria-controls="process" aria-selected="false">
                        <Link to="/cadastro_process">Cadastro do Processo</Link></span>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent" style={{ marginTop: '20px' }}>
                {props.children}
            </div>

        </div>


    )
};

export default SubHeader;
