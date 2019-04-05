import React from 'react';
import { Link } from 'react-router-dom';


const menu = [
    {
        title: 'Cadastrar Processo',
        text: 'Cadastre um novo processo, o interessado e o RT. Caso o interessado e RT estejam cadastrados, informe o nome e o formulário será preenchido automaticamente.',
        link: '/cadastro',
        img: '/images/cadastro.png',
        w:'105px',
        h:'125px'
    },
    {
        title: 'Solicitar Diretrizes',
        text: 'Para solicitar diretrizes metropolitanas, selecione o processo e faça o upload dos documentos necessários em pdf. É necessário que o processo esteja cadastrado.',
        link: '/solicitaDiretriz',
        img: '/images/solDir.jpg',
        w:'120px',
        h:'125px'
    },
    {
        title: 'Solicitar Anuência',
        text: 'Para solicitar anuência prévia, selecione o processo e faça o upload dos documentos em meio digital. É necessário que o processo tenha diretrizes metropolitanas validas.',
        link: '/solicitaDiretriz',
        img: '/images/solAnuencia2.png  ',
        w:'120px',
        h:'125px'
    },
    {
        title: 'Acompanhar Processos',
        text: 'Visualize os dados dos processos, interesados e responsáveis técnicos. Acompanhe o andamento dos processos e veja seus documentos, projetos e seu histórico.',
        link: '/showEmpreend',
        img: '/images/process_info3.png',
        w:'110px',
        h:'125px'
    },
]
const HomePref = (props) => {
    let { color } = props

    return (
        <div>
            {
                menu.map((item, i)=> (
                    <div align="center" className="col s12 m6 l3" key={i}>
                        <img src={item.img}
                            style={{ margin: '10px' }} alt="" width={item.w} height={item.h}/>
                        <h5><b>{item.title}</b></h5>
                        <p style={{ textAlign: 'justify', padding:'0 10%' }}>{item.text}</p>
                        <p className="btn" href="" role="button" style={{ backgroundColor: color }}>
                            <Link to={item.link} style={{ color: 'white' }}>{item.title}</Link>
                            {' '}&raquo;</p>
                    </div>
                ))}
        </div>
    )
};

export default HomePref;