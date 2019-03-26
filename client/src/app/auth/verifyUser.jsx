import React from 'react';

const VerifyUser = () => {
    return (
        <div className="container col s12 m12 l6" style={{ marginTop: '1%' }}>
            <img src="/images/ad_login.png" className='z-depth-2' alt="" />
            <div style={{ marginTop: '4%', textAlign: 'center' }} >
                <div className="card-panel">
                    <h5>Aguardando verificação do usuário.</h5> <br />
                    <button className='btn blue' onClick={() => window.location.reload()}>Voltar</button>
                </div>
            </div>
        </div>
    );
};

export default VerifyUser;