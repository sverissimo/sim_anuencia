import React from 'react';

const HomeEmpreend = (props) => {
    let { user } = props

    return (
        <div style={{marginTop: '3%'}}>
            <h5>Olá, {user.name} {user.surName}! Bem vindo ao sistema de anuência digital! </h5>
            <br/>
            <p>
                Para acompanhar o andamento de seus processos, clique em "gerenciar dados".
                Caso não haja nenhum processo cadastrado em seu nome, procure a prefeitura do município
                onde foi originado o processo e se certifique que seus dados foram informados corretamente.
            </p>
        </div>
    );
};

export default HomeEmpreend;