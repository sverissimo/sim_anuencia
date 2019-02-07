import React from 'react';

const titleSubtitle = (props) => {

    let { title, subtitle, color } = props

    return (
        <div className="row col s12" >
            <div style={{

                marginTop: '20px',
            }}>
                <h5>{title}</h5>
            </div>
            {
                subtitle ?
                    <div className="card-panel" style={{
                        marginBottom: '10px',
                        backgroundColor: color,
                        filter: 'brightness(200%)',
                        borderRadius: '10px 10px',
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        fontFamily: 'Calibri'
                    }}>
                        <span style={{color: 'black'}}>
                            {subtitle}
                        </span>
                    </div>
                    :
                    void 0
            }
        </div>
    );
};

export default titleSubtitle;