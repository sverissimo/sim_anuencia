import React from 'react';

const titleSubtitle = (props) => {

    let { title, subtitle, color } = props

    return (
        <div className="row col s12" >
            <div style={{
                fontSize: 28,
                fontFamily: 'arial',
                fontWeight: 'bold',
                marginTop: '20px',
            }}>
                <center>{title}</center>
            </div>
            <div className="card-panel" style={{
                marginBottom: '10px',
                
                backgroundColor: color,
                filter: 'brightness(190%)',
                borderRadius: '10px 10px'
            }}>
                <b>{subtitle}</b>
            </div>
        </div>
    );
};

export default titleSubtitle;