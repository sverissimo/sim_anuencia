import React from 'react';
import { Link } from 'react-router-dom';

const menu = [
    {
        title: 'Diretrizes Metropolitanas',
        text: 'Verifique a documentação enviada, agende a vistoria e a CGT e emita a diretriz metropolitana para os processos cadastrados.',
        link: '/diretrizes',
        img: '/images/solDir.jpg',
        w:'105px',
        h:'125px'
    },
    {
        title: 'Analisar Processos',
        text: 'Verifique a documentação, acesse os arquivos e documentos e analise os projetos enviados para emitir pendências ou anuir o processo.',
        link: '/anuencia',
        img: '/images/solAnuencia2.png',
        w:'120px',
        h:'120px'
    },
    {
        title: 'Acompanhar Processos',
        text: 'Verifique a documentação enviada, agende a vistoria e a CGT e emita a diretriz metropolitana para os processos cadastrados.',
        link: '/showEmpreend',
        img: '/images/process_info3.png',
        w:'110px',
        h:'115px'
    },
]

const HomeTecnico = (props) => {
    let { color } = props

    return (
        <div>
            {
                menu.map(item => (
                    <div align="center" className="col s12 m6 l4">
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
}

export default HomeTecnico;