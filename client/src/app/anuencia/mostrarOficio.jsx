import React from 'react';
import OficioHeader from './oficioHeader'

const MostrarOficio = (props) => {
    let { mostrarOficio, content, redux, process, empreend, rt, tecnicos } = props
    
    const loggedUser = localStorage.getItem('email')
    const tecnico = tecnicos.filter(el=> el.email.match(loggedUser))[0]
        
    if (mostrarOficio) {
        return (
            <div id='oficio'
                className='z-depth-3'
                style={{
                    position: 'relative',
                    borderRadius: '15px',
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '15px 0px 0px 30px',
                    border: '1px solid #ddd',
                    marginBottom: '25px'
                }}
            >
                <OficioHeader
                    redux={redux}
                    process={process}
                    empreend={empreend}
                    rt={rt}
                />
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
                <center>
                    <strong>
                        <p>{tecnico.name} {tecnico.surName}</p>
                    </strong>
                    <p>CAU/MG {tecnico.cau}</p>
                </center>
            </div>
        )
    }
    else return null
};

export default MostrarOficio;