import React from 'react';
import OficioHeader from './oficioHeader'

const MostrarOficio = (props) => {
    let { mostrarOficio, content } = props

    if (mostrarOficio) {
        return (
            <div className='container z-depth-3'
                style={{
                    position: 'relative',
                    borderRadius: '15px',
                    width: '80%',
                    backgroundColor: 'white',
                    padding: '15px 0px 0px 30px',
                    border: '1px solid #ddd',
                    marginBottom: '25px'

                }}
            >
                <OficioHeader />
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        )
    }
    else return null
};

export default MostrarOficio;